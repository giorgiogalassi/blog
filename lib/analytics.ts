export type FunnelEventName =
  | 'home_cta_book_call_click'
  | 'home_cta_work_click'
  | 'work_page_view'
  | 'contact_page_view'
  | 'contact_form_started'
  | 'contact_form_completed';

export function trackEvent(event: FunnelEventName, payload: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  const data = {
    event,
    timestamp: new Date().toISOString(),
    ...payload
  };

  const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer;
  if (Array.isArray(dataLayer)) {
    dataLayer.push(data);
  }

  if (process.env.NODE_ENV !== 'production') {
    console.info('[analytics]', data);
  }
}
