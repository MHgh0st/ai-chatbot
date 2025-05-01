import type { MenuItemTypes } from '@/types/MenuItemTypes';

export const VerticalMenuData: MenuItemTypes[] = [
  {
    label: 'خانه',
    icon: 'solar:home-2-bold-duotone',
    href: '/',
  },
  {
    label: 'داشبورد',
    icon: 'solar:widget-4-bold-duotone',
    children: [
      {
        label: 'Dashboard 1',
        icon: '',
      },
    ],
  },
];
