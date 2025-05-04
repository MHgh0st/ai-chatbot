'use client';

import type { Messages } from '@/types/MessagesTypes';

import UserMessages from '@/components/Messages/UserMessages';
import AiMessages from '@/components/Messages/AiMessages';
import { useState, useEffect } from 'react';

type Props = {
  className?: string;
};

export default function Messages(props: Props) {
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
      </div>
    </>
  );
}
