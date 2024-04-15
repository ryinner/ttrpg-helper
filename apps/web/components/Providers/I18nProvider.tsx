'use client';

import { useParams } from 'next/navigation';
import type { LayoutParams } from '../../app/[locale]/layout';
import { I18nProviderClient } from '../../locales/client';
import type React from 'react';

export default function I18nProvider ({ children }: Props) {
  const params = useParams<LayoutParams>();

  return <I18nProviderClient locale={params.locale}>
    {children}
  </I18nProviderClient>
}

interface Props {
  children: React.ReactNode;
}