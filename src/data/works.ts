/**
 * Proyectos Works: orden = orden en listado y en anterior/siguiente.
 * Galerías: `work-galleries.ts` (assets en public/images/works), descargadas 1:1 de
 * lavayen.framer.website/work/<slug>. OJO: `npm run sync:works` las sobreescribiría
 * con la carpeta local «IMAGES lavayen/TRABAJOS».
 */
import { workGalleries } from './work-galleries';
import type { WorkGalleryItem } from './work-gallery-types';

export type WorkGalleryImage = WorkGalleryItem;

function isVideoSlide(s: WorkGalleryItem): boolean {
	return s.media === 'video' || /\.mp4($|\?)/i.test(s.src);
}

function listThumbnail(gallery: WorkGalleryItem[]): { src: string; alt: string } {
	if (gallery.length === 0) {
		return { src: '/favicon.svg', alt: 'Proyecto' };
	}
	const firstStatic = gallery.find((x) => !isVideoSlide(x));
	if (firstStatic) {
		return { src: firstStatic.src, alt: firstStatic.alt };
	}
	return { src: '/favicon.svg', alt: gallery[0]!.alt };
}

export type WorkVideoEmbed = {
	/** ID numérico del vídeo en Vimeo */
	vimeoId: string;
	/** Relación de aspecto CSS (p. ej. '16 / 9' o '9 / 16') */
	aspect: string;
	title: string;
};

/** Fila de vídeos embebidos (réplica de la ficha «Motion Graphics & Vídeo» en Framer) */
export type WorkVideoRow = {
	gap: number;
	videos: WorkVideoEmbed[];
};

export type WorkProject = {
	slug: string;
	year: string;
	title: string;
	/** Etiqueta junto al año en la ficha (PERSONAL, VARIOS, cliente…) — igual que en Framer */
	tag?: string;
	/** Texto corto en el grid de /works */
	desc?: string;
	/** Imagen principal del listado (portada en /works, home) */
	img: string;
	alt: string;
	/** Galería en la ficha (mínimo una) */
	gallery: WorkGalleryImage[];
	/** HTML del texto principal de la ficha (columna derecha). */
	detailHtml: string;
	/** HTML del bloque de créditos (segundo párrafo, debajo del texto). */
	creditsHtml?: string;
	/** Si existe, la ficha muestra esta rejilla de vídeos en lugar del slideshow. */
	videoRows?: WorkVideoRow[];
};

function g(slug: keyof typeof workGalleries): WorkGalleryItem[] {
	return workGalleries[slug];
}

/** Créditos AGA — mismo HTML que en Framer (enlaces en nueva pestaña). */
const CREDITS_AGA =
	'<p>Directora creativa: <a href="https://belendepeter.myportfolio.com" target="_blank" rel="noopener">Belén de Pedro.</a><br>Producido en <a href="https://somosgrupoaga.com" target="_blank" rel="noopener">GRUPO AGA.</a></p>';

export const workProjects: WorkProject[] = [
	{
		slug: 'la-sinfonia-del-caos',
		year: '2025',
		tag: 'PERSONAL',
		title: 'La Sinfonía del Caos',
		desc: 'El ruido del día a día, convertido en collage.',
		gallery: g('la-sinfonia-del-caos'),
		img: '/images/symphony.webp',
		alt: 'La Sinfonía del Caos — collages',
		detailHtml:
			'<p>Una colección de collages sobre los sonidos del día con el ruido cotidiano como materia prima. Para los que lo celebran en lugar de luchar contra él.</p>'
	},
	{
		slug: 'womo-brand',
		year: '2024',
		tag: 'PERSONAL',
		title: 'WOMO Brand',
		desc: 'Identidad para una marca de ropa que no grita por atención.',
		gallery: g('womo-brand'),
		img: '/images/womo.webp',
		alt: 'WOMO Brand — branding',
		detailHtml:
			'<p>Proyecto personal que hay que sacar cuando se pasa por la cabeza. Una marca de ropa que no grita. Minimalista, ecosostenible y hecha para durar. Blanco, negro, verde, espacio negativo y ya. El reto era comunicar exclusividad sin parecer que te lo estás creyendo demasiado.</p>'
	},
	{
		slug: 'campana-pizzas-goodfellas',
		year: '2025',
		tag: 'FINDUS',
		title: "Campaña de pizzas Goodfella's",
		desc: 'Campaña de lanzamiento para la nueva gama de pizzas de Findus.',
		gallery: g('campana-pizzas-goodfellas'),
		img: '/images/goodfellas.avif',
		alt: "Campaña de pizzas Goodfella's",
		detailHtml:
			'<p>Campaña de lanzamiento para la nueva gama de pizzas de Findus. KV principal y adaptaciones a PDV y exterior. Varios idiomas y formatos y un queso derritiéndose en todos.</p>',
		creditsHtml: CREDITS_AGA
	},
	{
		slug: 'amor-fatum',
		year: '2022',
		tag: 'PERSONAL',
		title: 'Amor Fatum',
		desc: 'Tres perfumes, tres etapas de la vida.',
		gallery: g('amor-fatum'),
		img: '/images/amor-fatum.webp',
		alt: 'Amor Fatum — perfume',
		detailHtml:
			'<p>Proyecto personal. Tres perfumes, un concepto: el paso del tiempo. Cada fragancia es una etapa – joven, adulto, anciano. Cuanto más pulida, más vivida.</p>'
	},
	{
		slug: 'packaging',
		year: '2023 · 2026',
		tag: 'VARIOS',
		title: 'Packaging',
		desc: 'Ediciones especiales para bookstagramers. Cambias de libro, cambias de mundo.',
		gallery: g('packaging'),
		img: '/images/packaging.webp',
		alt: 'Packaging — ediciones promocionales de libros',
		detailHtml:
			'<p>Ediciones especiales para envíos a bookstagramers e influencers de Grupo Anaya. Cada caja construye el universo del libro, no solo lo envuelve. Fantasía oscura, thriller, novela gráfica – cambias de libro, cambias de mundo.</p>',
		creditsHtml: CREDITS_AGA
	},
	{
		slug: 'logofolio',
		year: '2024 · 2025',
		tag: 'VARIOS',
		title: 'Logofolio',
		desc: 'Logos. Varios. Buenos.',
		gallery: g('logofolio'),
		img: '/images/logofolio.webp',
		alt: 'Logofolio — identidades y logotipos',
		// En Framer la ficha no tiene texto
		detailHtml: ''
	},
	{
		slug: 'carteleria',
		year: '2022 · 2026',
		tag: 'VARIOS',
		title: 'Cartelería',
		desc: 'Carteles para clientes variados. Sin más historia que la que se ve.',
		gallery: g('carteleria'),
		img: '/images/carteleria.webp',
		alt: 'Cartelería y gráfica de gran formato — Ángel Lavayen',
		detailHtml:
			'<p>Una colección de trabajos de cartelería y gráfica de gran formato, diseñados para captar la atención de manera instantánea y transmitir mensajes claros.</p>',
		creditsHtml: CREDITS_AGA
	},
	{
		slug: 'merchandising-museo-del-traje',
		year: '2022',
		tag: 'PERSONAL',
		title: 'Merchandising Museo del Traje',
		desc: 'Arte de élite del Museo del Traje, en formato que cabe en el bolsillo.',
		...(() => {
			const gallery = g('merchandising-museo-del-traje');
			const t = listThumbnail(gallery);
			return { img: t.src, alt: t.alt, gallery };
		})(),
		detailHtml:
			'<p>Colecciones de producto inspiradas en diseñadores del museo. Cada pieza traduce la firma de un diseñador histórico a algo que puedes usar hoy. Arte de élite para el bolsillo de cualquier, literalmente.</p>'
	},
	{
		// No publicado en el listado de Framer; se mantiene accesible por URL.
		slug: 'beauty-pom-pom',
		year: '2025',
		title: 'Beauty Pom Pom',
		desc: 'Sistema visual',
		gallery: g('beauty-pom-pom'),
		img: '/images/beauty.webp',
		alt: 'Beauty Pom Pom — sistema visual',
		detailHtml:
			'<p>Sistema gráfico para Pom Pom – Beauty & Cosmetics: tipografía script de trazos fluidos y paleta de gris carbón, arena y crema. Lujo orgánico y bienestar consciente, de la papelería a lo digital.</p>'
	},
	{
		slug: 'motion-graphics-video',
		year: '2023 · 2025',
		tag: 'VARIOS',
		title: 'Motion Graphics & Vídeo',
		desc: 'Del Teatro Capitol al pasillo del supermercado. Si se mueve, algo mío hay detrás.',
		gallery: g('motion-graphics-video'),
		img: 'https://framerusercontent.com/images/5WxYMrv83dUYz4Bw19cWsTXhAuA.gif?width=800&height=600',
		alt: 'Motion graphics y vídeo — piezas audiovisuales y animación',
		detailHtml:
			'<p>De las pantallas del Teatro Capitol a los pasillos del supermercado. Storyboard, animación y montaje para campañas, eventos y retail.</p>',
		// Misma rejilla de Vimeo que la ficha original
		videoRows: [
			{
				gap: 10,
				videos: [
					{ vimeoId: '1130426251', aspect: '16 / 9', title: 'Shimano – Gravel' },
					{ vimeoId: '1130426264', aspect: '16 / 9', title: 'Motion graphics 2' }
				]
			},
			{
				gap: 10,
				videos: [{ vimeoId: '1152946988', aspect: '16 / 9', title: "I'm so lucky · Collage animado" }]
			},
			{
				gap: 30,
				videos: [
					{ vimeoId: '1152947219', aspect: '9 / 16', title: 'Vertical 1' },
					{ vimeoId: '1130425520', aspect: '0.561747 / 1', title: 'Vertical 2' },
					{ vimeoId: '1130425499', aspect: '9 / 16', title: 'Vertical 3' }
				]
			},
			{
				gap: 30,
				videos: [
					{ vimeoId: '1130421654', aspect: '9 / 16', title: 'Vertical 4' },
					{ vimeoId: '1130421674', aspect: '0.561747 / 1', title: 'Vertical 5' },
					{ vimeoId: '1130421637', aspect: '9 / 16', title: 'Vertical 6' },
					{ vimeoId: '1170389768', aspect: '9 / 16', title: 'Frenzy Navidad' }
				]
			}
		]
	},
	{
		slug: 'campanas-digitales',
		year: '2023 · 2024',
		tag: 'WARNER BROS ESPAÑA',
		title: 'Campañas digitales',
		desc: 'Banners para estrenos de Warner Bros. El trabajo invisible que ves en todas partes.',
		gallery: g('campanas-digitales'),
		img: '/images/campanas-digitales.webp',
		alt: 'Campañas digitales — banners para estrenos de Warner Bros',
		detailHtml:
			'<p>Banners animados en HTML5 para los estrenos de Warner bros. El trabajo invisible que ves en todas partes y nunca sabes quién lo hizo.</p>'
	},
	{
		slug: 'diseno-editorial',
		year: '2024 · 2026',
		tag: 'VARIOS',
		title: 'Diseño editorial',
		desc: 'Folletos, catálogos y piezas de comunicación.',
		gallery: g('diseno-editorial'),
		img: '/images/diseno-editorial.webp',
		alt: 'Diseño editorial',
		detailHtml:
			'<p>Folletos corporativos, catálogos y piezas de comunicación para varios clientes. El trabajo que nadie ve hasta que está mal.</p>',
		creditsHtml: CREDITS_AGA
	},
	{
		slug: 'pio-pio',
		year: '2023',
		tag: 'PÍO PÍO SHOES',
		title: 'Pío Pío',
		desc: 'Branding para una marca de zapatos infantiles. Identidad completa, mascota incluida.',
		gallery: g('pio-pio'),
		img: '/images/pio-pio.webp',
		alt: 'Pío Pío — branding infantil para calzado',
		detailHtml:
			'<p>Branding para una mezcla de zapatos infantiles. Identidad completa: logo con mascota ilustrada, packaging, etiquetas, stickers y pin. El cliente eligió otra propuesta que hice pero esta me gusta más así que aquí está.</p>',
		creditsHtml: CREDITS_AGA
	},
	{
		slug: 'lesj-centro-estetico',
		year: '2023',
		tag: 'PERSONAL',
		title: 'LESJ Centro estético',
		desc: 'Una clínica estética que pone la cabeza antes que el cuerpo.',
		gallery: g('lesj-centro-estetico'),
		img: '/images/lesj.webp',
		alt: 'LESJ Centro estético — branding',
		detailHtml:
			'<p>Branding para una clínica estética con un enfoque poco común: primero la cabeza y después el cuerpo. Identidad minimalista construida sobre cuatro pilares de bienestar.</p>'
	},
	{
		slug: 'shimano-days',
		year: '2025',
		tag: 'SHIMANO',
		title: 'Shimano Days',
		desc: 'Identidad para el evento interno de novedades de Shimano.',
		gallery: g('shimano-days'),
		img: '/images/shimano.webp',
		alt: 'Shimano Days — evento Shimano',
		detailHtml:
			'<p>Identidad visual para el evento interno de novedades de Shimano. Logo, invitaciones, señalización y contenido digital – todo coherente y con energía de ciclismo.</p>',
		creditsHtml: CREDITS_AGA
	},
	{
		slug: 'diseno-ambiental',
		year: '2023 · 2025',
		tag: 'AMADEUS',
		title: 'Diseño ambiental',
		desc: 'Arte pop en las paredes de una empresa tecnológica. Alguien tenía que hacerlo.',
		gallery: g('diseno-ambiental'),
		img: '/images/diseno-ambiental.webp',
		alt: 'Diseño ambiental — oficinas AMADEUS',
		detailHtml:
			'<p>Vinilos de gran formato para las oficinas de Amadeus en Madrid. Arte pop y contemporáneo en un espacio corporativo.</p>',
		creditsHtml: CREDITS_AGA
	}
];

export function getWorkBySlug(slug: string): WorkProject | undefined {
	return workProjects.find((p) => p.slug === slug);
}

/** Orden del listado /works, alineado con el original de Framer. */
export const workListOrder = [
	'la-sinfonia-del-caos',
	'motion-graphics-video',
	'campana-pizzas-goodfellas',
	'campanas-digitales',
	'womo-brand',
	'packaging',
	'logofolio',
	'shimano-days',
	'diseno-editorial',
	'diseno-ambiental',
	'amor-fatum',
	'carteleria',
	'merchandising-museo-del-traje',
	'pio-pio',
	'lesj-centro-estetico'
] as const;

export function getListedWorks(): WorkProject[] {
	return workListOrder.map((slug) => {
		const p = getWorkBySlug(slug);
		if (!p) throw new Error(`Work no encontrado: ${slug}`);
		return p;
	});
}

/** Primer año en `year` (p. ej. "2023 · 2025") → fecha ISO para schema.org `datePublished`. */
export function yearToSchemaDatePublished(year: string): string {
	const m = year.match(/(\d{4})/);
	return m ? `${m[1]}-01-01` : '2020-01-01';
}

export function getWorkNeighbors(slug: string): {
	current: WorkProject;
	prev: WorkProject | null;
	next: WorkProject | null;
} | null {
	const listed = getListedWorks();
	const listedIndex = listed.findIndex((p) => p.slug === slug);
	if (listedIndex !== -1) {
		return {
			current: listed[listedIndex]!,
			prev: listedIndex > 0 ? listed[listedIndex - 1]! : null,
			next: listedIndex < listed.length - 1 ? listed[listedIndex + 1]! : null
		};
	}

	const i = workProjects.findIndex((p) => p.slug === slug);
	if (i === -1) return null;
	return {
		current: workProjects[i]!,
		prev: i > 0 ? workProjects[i - 1]! : null,
		next: i < workProjects.length - 1 ? workProjects[i + 1]! : null
	};
}