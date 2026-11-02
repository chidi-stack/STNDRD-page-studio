'use client';

import { DevLinkProvider } from '@/webflow/DevLinkProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return <DevLinkProvider>{children}</DevLinkProvider>;
}
