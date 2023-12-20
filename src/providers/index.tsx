'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const client = new QueryClient({
  defaultOptions: { queries: { staleTime: 5000 } },
});

const Providers = ({ children }: React.PropsWithChildren) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default Providers;
