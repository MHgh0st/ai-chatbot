import { VerticalMenuData } from '@/data/VerticalMenuData';
import MenuItem from '@/components/navigation/MenuItem';
import MenuItemParent from '@/components/navigation/MenuItemParent';
import Logo from '@/components/Logo';

export default function VerticalMenu(props: { className: string }) {
  return (
    <>
      <div
        className={`${props.className} h-screen flex flex-col gap-y-2 px-2 pt-6 bg-zinc-100`}
      >
        <Logo />
        {VerticalMenuData.map((item, index) => {
          const itemKey = `menu-item-${item.label}-${index}`;

          return item.children ? (
            <MenuItemParent key={itemKey} item={item} />
          ) : (
            <MenuItem key={itemKey} item={item} />
          );
        })}
      </div>
    </>
  );
}
