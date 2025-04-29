import type { MenuItemTypes } from '@/types/MenuItemTypes';

export const VerticalMenuData: MenuItemTypes[] = [
  {
    label: 'Home',
    icon: 'solar:home-2-bold-duotone',
    href: '/home',
  },
  {
    label: 'Dashboard',
    icon: 'solar:widget-4-bold-duotone',
    children: [
      {
        label: 'Dashboard 1',
        icon: '',
      },
    ],
  },
];
