'use client';

import { Toaster } from 'react-hot-toast';

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          color: 'var(--main-black)',
          fontFamily: 'var(--font-family)',
        },
        success: {
          iconTheme: {
            primary: 'var(--main-dark-green)',
            secondary: 'var(--main-white)',
          },
        },
        error: {
          iconTheme: {
            primary: 'var(--main-red)',
            secondary: 'var(--main-white)',
          },
        },
      }}
    />
  );
};