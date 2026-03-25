/** Origen canónico del sitio (alineado con astro.config site). */
export const SITE_ORIGIN = 'https://lavayen.me';

/** Imagen Open Graph por defecto (~1200×630 WebP), generada desde `lavayen-pic.webp`. */
export const OG_IMAGE_DEFAULT_PATH = '/images/og-social.webp' as const;
export const OG_IMAGE_DEFAULT_URL = new URL(OG_IMAGE_DEFAULT_PATH, SITE_ORIGIN).href;
export const OG_IMAGE_DEFAULT_WIDTH = 1200;
export const OG_IMAGE_DEFAULT_HEIGHT = 630;

/** Nombre completo para schema.org y consistencia con búsquedas por nombre. */
export const PERSON_LEGAL_NAME = 'Ángel Alejandro Lavayen Ruiz';
export const PERSON_SHORT_NAME = 'Ángel Lavayen';

/** Perfiles para JSON-LD sameAs y enlaces coherentes con el footer. */
export const SOCIAL_PROFILE_URLS = [
	'https://www.instagram.com/angeel_lav/',
	'https://www.linkedin.com/in/angel-lavayen/'
] as const;
