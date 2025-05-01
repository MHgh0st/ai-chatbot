import ThemeChanger from '@/components/ThemeChanger';
import OpenDrawer from '@/components/OpenDrawer';
import Logo from '@/components/Logo';
export default function Header() {
  return (
    <div className="flex items-center justify-between px-3 pt-4">
      <div>
        <OpenDrawer />
      </div>
      <div>
        <Logo className="md:hidden"></Logo>
      </div>
      <div>
        <ThemeChanger />
      </div>
    </div>
  );
}
