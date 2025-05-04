import type { ReactNode } from 'react';
import Logo from '@/components/Logo';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo width={150} height={50} />
        </div>
        {children}
      </div>
    </main>
  );
}
