'use client';

import type { MenuItemTypes } from '@/types/MenuItemTypes';

import { Button, Link } from '@heroui/react';
import { Icon } from '@iconify/react';

export default function MenuItem(props: { item: MenuItemTypes }) {
  return (
    <>
      <Link href={props.item.href}>
        <Button
          fullWidth
          className="w-full justify-start"
          startContent={<Icon icon={props.item.icon} fontSize={16} />}
        >
          {props.item.label}
        </Button>
      </Link>
    </>
  );
}
