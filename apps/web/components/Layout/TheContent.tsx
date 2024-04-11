import type React from 'react';

export default function TheContent ({ children }: Props) {
  return <main className='web-bg-slate-900'>
    {children}
  </main>
}

interface Props {
  children: React.ReactNode;
}