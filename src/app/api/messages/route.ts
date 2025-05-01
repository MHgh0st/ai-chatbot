import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Messages } from '@/types/MessagesTypes';

// Path to the messages data file
const DATA_FILE_PATH = path.join(
  process.cwd(),
  'src',
  'data',
  'MessgaesData.ts'
);

// Function to read the current messages from the file
async function readMessagesFile(): Promise<string> {
  try {
    return await fs.readFile(DATA_FILE_PATH, 'utf-8');
  } catch (error) {
    console.error('Error reading messages file:', error);
    throw new Error('Failed to read messages file');
  }
}

// Function to write updated messages to the file
async function writeMessagesFile(content: string): Promise<void> {
  try {
    await fs.writeFile(DATA_FILE_PATH, content, 'utf-8');
  } catch (error) {
    console.error('Error writing messages file:', error);
    throw new Error('Failed to write messages file');
  }
}

// GET handler to return all messages
export async function GET() {
  try {
    const fileContent = await readMessagesFile();
    // This is a simple approach - in production you'd want a more robust parser
    const messagesMatch = fileContent.match(
      /export const MessagesData: Messages\[\] = (\[[\s\S]*?\]);/
    );

    if (!messagesMatch || !messagesMatch[1]) {
      return NextResponse.json(
        { error: 'Unable to parse messages' },
        { status: 500 }
      );
    }

    // Use eval to convert the string to an actual array (not recommended for production)
    // In production, use a proper parser or store data in JSON format
    const messagesArray = eval(messagesMatch[1]);

    return NextResponse.json({ messages: messagesArray });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST handler to add a new message
export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message.content !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      );
    }

    // Create a new message object
    const newMessage: Messages = {
      content: message.content,
      sendDate: new Date(),
      role: message.role || 'User',
    };

    // Read the current file content
    const fileContent = await readMessagesFile();

    // Find the end of the messages array
    const lastBracketIndex = fileContent.lastIndexOf('];');

    if (lastBracketIndex === -1) {
      return NextResponse.json(
        { error: 'Invalid file format' },
        { status: 500 }
      );
    }

    // Format the new message as a string
    const newMessageString = `
  {
    content: ${JSON.stringify(newMessage.content)},
    sendDate: new Date(),
    role: ${JSON.stringify(newMessage.role)},
  },`;

    // Insert the new message before the closing bracket
    const updatedContent =
      fileContent.substring(0, lastBracketIndex) +
      newMessageString +
      fileContent.substring(lastBracketIndex);

    // Write the updated content back to the file
    await writeMessagesFile(updatedContent);

    // Return the new message
    return NextResponse.json({ message: newMessage });
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
