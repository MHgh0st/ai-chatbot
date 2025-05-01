'use client';

import { Card, CardBody } from '@heroui/react';
import type { Messages } from '@/types/MessagesTypes';

type Props = {
  className?: string;
  Message: Messages;
};

export default function AiMessages(props: Props) {
  // Format the message to preserve line breaks
  const formattedContent = props.Message.content.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      {i < props.Message.content.split('\n').length - 1 && <br />}
    </span>
  ));

  return (
    <div className="self-end">
      <Card className="bg-default max-w-md w-fit" shadow="none">
        <CardBody className="text-right leading-6.5 antialiased whitespace-pre-wrap">
          {formattedContent}
        </CardBody>
      </Card>
    </div>
  );
}
