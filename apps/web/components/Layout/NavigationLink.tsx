"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import type React from "react";
import type { LayoutParams } from '../../app/[locale]/layout';

export function NavigationLink({
  className: propsClassName = "hover:web-text-indigo-300",
  activeClassName = "web-text-indigo-500",
  href,
  children,
}: Props) {
  const params = useParams<LayoutParams>();
  const pathname = usePathname().replace(`/${params.locale}`, '');
  const className =
    `${propsClassName} ${pathname === href ? activeClassName : ""}`.trim();

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

interface Props {
  children: React.ReactNode;
  href: string;
  className?: string;
  activeClassName?: string;
}
