// app/providers.tsx
'use client';

import { useRouter } from 'next/navigation';
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { AnimatePresence } from 'framer-motion';

// Only if using TypeScript
declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
