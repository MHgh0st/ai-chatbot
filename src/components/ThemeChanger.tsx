'use client';

import { Button } from '@heroui/react';
import { useTheme } from 'next-themes';
import { Icon } from '@iconify/react';
export default function ThemeChanger() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <Button
        isIconOnly
        color="default"
        onPress={() => {
          setTheme(theme === 'dark' ? 'light' : 'dark');
        }}
      >
        <Icon
          icon={
            theme === 'dark'
              ? 'solar:moon-bold-duotone'
              : 'solar:sun-bold-duotone'
          }
          fontSize={22}
        ></Icon>
      </Button>
    </>
  );
}
