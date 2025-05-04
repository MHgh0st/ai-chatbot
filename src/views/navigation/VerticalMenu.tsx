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

// Bottom menu items
const bottomMenuItems = [
  {
    label: 'ثبت نام / ورود',
    href: '/auth/login',
    icon: 'solar:login-3-bold-duotone',
  },
];

export default function VerticalMenu(props: { className: string }) {
  const [isOpen, setIsOpen] = useAtom(isOpenDrawer);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <>
      <div
        className={`${props.className} hidden md:flex h-screen flex-col px-2 pt-6 bg-zinc-100 dark:bg-zinc-900`}
      >
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        {/* Main menu items */}
        <div className="flex-grow flex flex-col gap-y-2 overflow-y-auto">
          {VerticalMenuData.map((item, index) => {
            const itemKey = `menu-item-${item.label}-${index}`;

            return item.children ? (
              <MenuItemParent key={itemKey} item={item} />
            ) : (
              <MenuItem key={itemKey} item={item} />
            );
          })}
        </div>

        {/* Bottom menu items */}
        <div className="mt-auto border-t border-zinc-200 dark:border-zinc-700 pt-2 mb-6 flex flex-col gap-y-2">
          {bottomMenuItems.map((item, index) => {
            const itemKey = `bottom-menu-item-${item.label}-${index}`;
            return <MenuItem key={itemKey} item={item} />;
          })}
        </div>
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
          <DrawerBody className="flex flex-col gap-y-2 overflow-y-auto">
            {VerticalMenuData.map((item, index) => {
              const itemKey = `mobile-menu-item-${item.label}-${index}`;

              return item.children ? (
                <MenuItemParent key={itemKey} item={item} />
              ) : (
                <MenuItem key={itemKey} item={item} />
              );
            })}
          </DrawerBody>
          <DrawerFooter className="flex flex-col border-t border-zinc-200 dark:border-zinc-700 pt-2">
            {bottomMenuItems.map((item, index) => {
              const itemKey = `mobile-bottom-menu-item-${item.label}-${index}`;
              return <MenuItem key={itemKey} item={item} />;
            })}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
