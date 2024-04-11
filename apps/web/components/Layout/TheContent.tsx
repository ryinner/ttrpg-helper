import type React from 'react';

export default function TheContent ({ children }: Props) {
  return <main>
    {children}
  </main>
}

interface Props {
  children: React.ReactNode;
}