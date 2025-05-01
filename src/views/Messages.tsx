'use client';

import type { Messages } from '@/types/MessagesTypes';

import UserMessages from '@/components/Messages/UserMessages';
import AiMessages from '@/components/Messages/AiMessages';
import { useState, useEffect } from 'react';

type Props = {
  className?: string;
};

export default function Messages(props: Props) {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/messages');

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to load messages. Please refresh the page.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch messages when the component mounts
  useEffect(() => {
    fetchMessages();

    // Set up a polling mechanism to refresh messages every 5 seconds
    const intervalId = setInterval(fetchMessages, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading && messages.length === 0) {
    return <div className="flex justify-center p-4">Loading messages...</div>;
  }

  if (error && messages.length === 0) {
    return <div className="text-red-500 p-4">{error}</div>;
  }
  return (
    <>
      <div
        className={`${props.className} flex flex-col gap-y-2 px-4 my-4 overflow-y-auto`}
      >
        {messages.map((Message, index) =>
          Message.role === 'User' ? (
            <UserMessages key={index} Message={Message} />
          ) : (
            <AiMessages key={index} Message={Message} />
          )
        )}
      </div>
    </>
  );
}
