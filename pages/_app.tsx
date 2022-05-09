/* eslint-disable react/jsx-props-no-spreading */
import React, { StrictMode } from 'react';
import type { AppProps } from 'next/app';
import { Provider } from '@context/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <StrictMode>
        <Component {...pageProps} />
      </StrictMode>
    </Provider>
  );
}

export default MyApp;
