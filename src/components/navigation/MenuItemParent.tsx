'use client';

import type { MenuItemTypes } from '@/types/MenuItemTypes';
import { Accordion, AccordionItem } from '@heroui/react';
import MenuItem from '@/components/navigation/MenuItem';
import { Icon } from '@iconify/react';

export default function MenuItemParent({
  item,
}: Readonly<{
  item: MenuItemTypes;
}>) {
  return (
    <>
      <Accordion
        variant="light"
        isCompact
        className="bg-default rounded-xl pr-4"
      >
        <AccordionItem
          key="1"
          aria-label={item.label}
          title={<p className="text-sm -mr-1">{item.label}</p>}
          startContent={<Icon icon={item.icon} fontSize={16} />}
        >
          <div className="flex flex-col gap-y-2">
            {item.children?.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </>
  );
}
