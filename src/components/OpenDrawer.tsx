'use client';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useSetAtom } from 'jotai';
import { isOpenDrawer } from '@/lib/state/NavigationAtoms';

export default function OpenDrawer() {
  const setOpenDrawer = useSetAtom(isOpenDrawer);
  return (
    <>
      <Button
        className="md:hidden"
        isIconOnly
        color="default"
        onPress={() => {
          setOpenDrawer(true);
        }}
      >
        <Icon icon="solar:hamburger-menu-line-duotone" fontSize={22}></Icon>
      </Button>
    </>
  );
}
