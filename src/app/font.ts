import localFont from 'next/font/local';

export const YekanBakh = localFont({
  src: [
    {
      path: './fonts/YekanBakh-Thin.woff2',
      weight: '200',
    },
    {
      path: './fonts/YekanBakh-Light.woff2',
      weight: '300',
    },
    {
      path: './fonts/YekanBakh-Regular.woff2',
      weight: '400',
    },
    {
      path: './fonts/YekanBakh-SemiBold.woff2',
      weight: '500',
    },
    {
      path: './fonts/YekanBakh-Bold.woff2',
      weight: '600',
    },
    {
      path: './fonts/YekanBakh-ExtraBold.woff2',
      weight: '700',
    },
    {
      path: './fonts/YekanBakh-Black.woff2',
      weight: '800',
    },
    {
      path: './fonts/YekanBakh-ExtraBlack.woff2',
      weight: '900',
    },
  ],
  variable: '--font-yekanBakh',
  display: 'swap', // Font display strategy (swap is often good)
});
