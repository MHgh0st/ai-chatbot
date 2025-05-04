// app/providers.tsx
'use client';

import { useRouter } from 'next/navigation';
import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Provider as JotaiProvider } from 'jotai';
import { AnimatePresence } from 'framer-motion';
import { createStore } from 'jotai';

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
  const Store = createStore();

  return (
    <HeroUIProvider navigate={router.push}>
      <ToastProvider />
      <NextThemesProvider attribute="class" defaultTheme="light">
        <AnimatePresence mode="wait">
          <JotaiProvider store={Store}>{children}</JotaiProvider>
        </AnimatePresence>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
