'use client';
import { VerticalMenuData } from '@/data/VerticalMenuData';
import MenuItem from '@/components/navigation/MenuItem';
import MenuItemParent from '@/components/navigation/MenuItemParent';
import Logo from '@/components/Logo';
import { useAtom } from 'jotai';
import { isOpenDrawer } from '@/lib/state/NavigationAtoms';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@heroui/react';
export default function VerticalMenu(props: { className: string }) {
  const [isOpen, setIsOpen] = useAtom(isOpenDrawer);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <>
      <div
        className={`${props.className} hidden md:flex h-screen flex-col gap-y-2 px-2 pt-6 bg-zinc-100 dark:bg-zinc-900`}
      >
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        {VerticalMenuData.map((item, index) => {
          const itemKey = `menu-item-${item.label}-${index}`;

          return item.children ? (
            <MenuItemParent key={itemKey} item={item} />
          ) : (
            <MenuItem key={itemKey} item={item} />
          );
        })}
      </div>

      <Drawer
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        size="xs"
        backdrop="blur"
      >
        <DrawerContent>
          <DrawerHeader>
            <Logo />
          </DrawerHeader>
          <DrawerBody>
            {VerticalMenuData.map((item, index) => {
              const itemKey = `mobile-menu-item-${item.label}-${index}`;

              return item.children ? (
                <MenuItemParent key={itemKey} item={item} />
              ) : (
                <MenuItem key={itemKey} item={item} />
              );
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
