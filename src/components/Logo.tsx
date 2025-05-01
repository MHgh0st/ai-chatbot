'use client';

import { Image } from '@heroui/react';
import NextImage from 'next/image';

type Props = {
  className?: string;
  width?: number;
  height?: number;
};

export default function Logo(props: Props) {
  return (
    <>
      <Image
        className={props.className}
        src="/next.svg"
        width={props.width || 180}
        height={props.height || 30}
        as={NextImage}
        radius="none"
        alt="Next Logo"
      ></Image>
    </>
  );
}
