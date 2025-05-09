'use client';

import type { Messages } from '@/types/MessagesTypes';

import { useUser } from '@/hooks/useUser';

import UserMessages from '@/components/Messages/UserMessages';
import AiMessages from '@/components/Messages/AiMessages';
import { useState, useEffect } from 'react';

type Props = {
  className?: string;
};

export default function Messages(props: Props) {
  const { user, isLoading } = useUser();

  return (
    <>
      <div
        className={`${props.className} flex flex-col gap-y-2 px-4 my-4 overflow-y-auto`}
      >
        {/* {messages.map((Message, index) =>
          Message.role === 'User' ? (
            <UserMessages key={index} Message={Message} />
          ) : (
            <AiMessages key={index} Message={Message} />
          )
        )} */}
        {isLoading ? 'loading...' : user?.name}
      </div>
    </>
  );
}
