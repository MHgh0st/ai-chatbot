'use client';

import { Image } from '@heroui/react';
import NextImage from 'next/image';

export default function Logo() {
  return (
    <>
      <div className="w-full flex justify-center mb-10">
        <Image
          src="/next.svg"
          width={100}
          height={20}
          as={NextImage}
          radius="none"
          alt="Next Logo"
        ></Image>
      </div>
    </>
  );
}
