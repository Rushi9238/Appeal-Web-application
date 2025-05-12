'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'next-themes';
import { persistor, store } from '@/redux/store';
import { ToastContainer } from 'react-toastify';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}   