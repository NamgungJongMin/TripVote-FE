import {ChakraProvider} from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import {RecoilRoot} from 'recoil';

import App from './App.tsx';
import {customTheme} from './chakra/chakraCustomTheme.ts';

async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  const {worker} = await import('./mocks/browser');
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <HelmetProvider>
      <RecoilRoot>
        <ChakraProvider theme={customTheme}>
          <App />
        </ChakraProvider>
      </RecoilRoot>
    </HelmetProvider>,
    // </React.StrictMode>,
  );
});
