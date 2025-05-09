import PromptInput from '@/views/PromptInput';
import Header from '@/views/Header';
import Messages from '@/views/Messages';

import { cookies } from 'next/headers';
export default async function Home() {
  return (
    <div className="h-full flex flex-col justify-between">
      <Header />
      <Messages className="grow" />
      <PromptInput />
    </div>
  );
}
