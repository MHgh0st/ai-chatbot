'use client';
import { Button, Textarea } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useState } from 'react';

export default function PromptInput() {
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return; // Don't send empty messages or if already sending

    try {
      setIsLoading(true);

      // Call our API endpoint to save the message
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: {
            content: message,
            role: 'User',
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error sending message:', errorData);
        throw new Error('Failed to send message');
      }

      // Message was successfully saved
      console.log('Message sent successfully');

      // Clear the input
      setMessage('');

      // You might want to refresh the messages list or trigger a UI update here
    } catch (error) {
      console.error('Error in sendMessage:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex px-3 pb-4 gap-x-3">
        <Textarea
          placeholder="هر چیزی که توی فکرته رو بگو ..."
          className="col-span-11"
          minRows={1}
          maxRows={5}
          value={message}
          onChange={e => {
            setMessage(e.target.value);
          }}
          disabled={isLoading}
        />
        <Button
          isIconOnly
          aria-label="Send"
          color="primary"
          onPress={sendMessage}
          isLoading={isLoading}
        >
          <Icon icon="solar:plain-bold-duotone" fontSize={20}></Icon>
        </Button>
      </div>
    </>
  );
}
