// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://lavayen.me',
	integrations: [
		sitemap({
			filter: (page) => !page.includes('/legal/') && !page.includes('/404')
		})
	],
	compressHTML: true,
	redirects: {
		'/work': '/works',
		'/work/la-sinfonia-del-caos': '/works/la-sinfonia-del-caos',
		'/work/motion-graphic-video': '/works/motion-graphics-video',
		'/work/goodfellas': '/works/campana-pizzas-goodfellas',
		'/work/campanas-digitales': '/works/campanas-digitales',
		'/work/womo': '/works/womo-brand',
		'/work/packaging': '/works/packaging',
		'/work/logofolio': '/works/logofolio',
		'/work/shimano-days': '/works/shimano-days',
		'/work/diseno-editorial': '/works/diseno-editorial',
		'/work/diseno-ambiental': '/works/diseno-ambiental',
		'/work/amor-fatum': '/works/amor-fatum',
		'/work/carteleria': '/works/carteleria',
		'/work/mmdt': '/works/merchandising-museo-del-traje',
		'/work/piopio': '/works/pio-pio',
		'/work/lesj': '/works/lesj-centro-estetico'
	}
});