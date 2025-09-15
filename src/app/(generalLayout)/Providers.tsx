"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MainProvider } from "../context/MainContext";
import { useMemo } from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const queryClient = useMemo(() => new QueryClient(), []);
  return (
    <QueryClientProvider client={queryClient}>
      <MainProvider>{children}</MainProvider>
    </QueryClientProvider>
  );
}
