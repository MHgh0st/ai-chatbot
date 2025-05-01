import VerticalMenu from '@/views/navigation/VerticalMenu';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div id="layout" className="grid grid-cols-24">
        <VerticalMenu className="col-span-7 lg:col-span-5" />
        <main className="col-span-24 md:col-span-17 lg:col-span-19 h-screen">
          {children}
        </main>
      </div>
    </>
  );
}
