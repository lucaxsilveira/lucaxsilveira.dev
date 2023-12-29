'use client';

import React from 'react';

import { Provider as ToastProvider } from '@radix-ui/react-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient({
  defaultOptions: { queries: { staleTime: 5000 } },
});

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <ToastProvider>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </ToastProvider>
  );
};

export default Providers;
