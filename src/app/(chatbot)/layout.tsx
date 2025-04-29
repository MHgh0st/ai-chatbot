import VerticalMenu from '@/views/navigation/VerticalMenu';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div id="layout" className="grid grid-cols-24">
        <VerticalMenu className="col-span-5" />
      </div>
    </>
  );
}
