"use client";

import { StackProvider } from "@stackframe/stack";
import { stackClientApp } from "@/lib/stack";
import { ReactNode } from "react";

interface StackProviderWrapperProps {
  children: ReactNode;
}

export function StackProviderWrapper({ children }: StackProviderWrapperProps) {
  return (
    <StackProvider app={stackClientApp}>
      {children}
    </StackProvider>
  );
}