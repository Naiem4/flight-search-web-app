'use client';
import { getQueryClient } from '@/utils/get-query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';

type ProviderProps = {
  children: ReactNode;
};

export const Providers: FC<ProviderProps> = ({ children }) => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

Providers.displayName = 'Providers';
