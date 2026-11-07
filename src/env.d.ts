/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_LEAD_ENDPOINT?: string;
  readonly PUBLIC_LEAD_PROVIDER?: string;
  readonly PUBLIC_CONTACT_EMAIL?: string;
  readonly PUBLIC_TELEGRAM_URL?: string;
  readonly PUBLIC_ANALYTICS_SRC?: string;
  readonly PUBLIC_ANALYTICS_DOMAIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
