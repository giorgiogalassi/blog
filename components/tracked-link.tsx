'use client';

import Link, { type LinkProps } from 'next/link';
import type { ReactNode } from 'react';

import { trackEvent, type FunnelEventName } from '@/lib/analytics';

type TrackedLinkProps = LinkProps & {
  className?: string;
  children: ReactNode;
  eventName: FunnelEventName;
  payload?: Record<string, unknown>;
  target?: string;
  rel?: string;
};

export function TrackedLink({
  children,
  eventName,
  payload,
  onClick,
  ...props
}: TrackedLinkProps & { onClick?: React.MouseEventHandler<HTMLAnchorElement> }) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent(eventName, payload);
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}
