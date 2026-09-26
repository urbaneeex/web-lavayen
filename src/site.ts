/** Origen canónico del sitio (alineado con astro.config site). */
export const SITE_ORIGIN = 'https://lavayen.me';

/** Identificadores estables de schema.org. Siguen al origen cuando cambie el dominio. */
export const PERSON_ID = `${SITE_ORIGIN}/#person`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url
		}))
	};
}

/** Imagen Open Graph por defecto (~1200×630 WebP), generada desde `lavayen-pic.webp`. */
export const OG_IMAGE_DEFAULT_PATH = '/images/og-social.webp' as const;
export const OG_IMAGE_DEFAULT_URL = new URL(OG_IMAGE_DEFAULT_PATH, SITE_ORIGIN).href;
export const OG_IMAGE_DEFAULT_WIDTH = 1200;
export const OG_IMAGE_DEFAULT_HEIGHT = 630;

/** Nombre completo para schema.org y consistencia con búsquedas por nombre. */
export const PERSON_LEGAL_NAME = 'Ángel Alejandro Lavayen Ruiz';
export const PERSON_SHORT_NAME = 'Ángel Lavayen';

/** Perfiles para JSON-LD sameAs y enlaces coherentes con el footer. */
export const INSTAGRAM_URL = 'https://www.instagram.com/angeel_lav/';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/ángel-lavayen';
export const SOCIAL_PROFILE_URLS = [INSTAGRAM_URL, LINKEDIN_URL] as const;

export const POSTER_GUMROAD = {
	takeWhatsYours: 'https://lavayenart.gumroad.com/l/kztogu?layout=profile',
	ramen: 'https://lavayenart.gumroad.com/l/txvfvx'
} as const;
