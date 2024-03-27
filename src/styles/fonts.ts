import localFont from 'next/font/local';

const markOt = localFont({
  src: [
    {
      path: './MarkOT/MarkOT-Light.otf',
      weight: '350',
      style: 'normal',
    },
    {
      path: './MarkOT/MarkOT.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './MarkOT/MarkOT-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './MarkOT/MarkOT-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
});

const markOtLight = localFont({
  src: './MarkOT/MarkOT-Light.otf',
  weight: '350',
  style: 'normal',
});

const markOtMedium = localFont({
  src: './MarkOT/MarkOT-Medium.otf',
  weight: '500',
  style: 'normal',
});

export { markOt, markOtLight, markOtMedium };
