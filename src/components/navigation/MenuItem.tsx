'use client';

import type { MenuItemTypes } from '@/types/MenuItemTypes';

import { Button, Link } from '@heroui/react';
import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';

export default function MenuItem(props: {
  item: MenuItemTypes;
  onPress?: () => void;
}) {
  const PathName = usePathname();

  return (
    <>
      <Link href={props.item.href}>
        <Button
          onPress={props.onPress}
          fullWidth
          className="w-full justify-start"
          color={
            PathName === props.item.href
              ? 'primary'
              : props.item.color || 'default'
          }
          startContent={<Icon icon={props.item.icon} fontSize={16} />}
        >
          {props.item.label}
        </Button>
      </Link>
    </>
  );
}
