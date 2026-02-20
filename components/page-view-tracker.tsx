'use client';

import { useEffect } from 'react';

import { trackEvent, type FunnelEventName } from '@/lib/analytics';

type PageViewTrackerProps = {
  event: FunnelEventName;
  payload?: Record<string, unknown>;
};

export function PageViewTracker({ event, payload }: PageViewTrackerProps) {
  useEffect(() => {
    trackEvent(event, payload);
  }, [event, payload]);

  return null;
}
