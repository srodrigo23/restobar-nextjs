'use client'

import {HeroUIProvider} from '@heroui/react'
import { ToastProvider } from '@heroui/toast';

export function ProvidersHeroUI({children}: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider placement='top-center'/>
      {children}
    </HeroUIProvider>
  );
}