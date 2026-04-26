/**
 * Proyectos Works: orden = orden en listado y en anterior/siguiente.
 * Galerías: `work-galleries.ts` (assets en public/images/works) — regenerar con
 *   npm run sync:works
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

export type WorkProject = {
	slug: string;
	year: string;
	title: string;
	/** Texto corto en el grid de /works */
	desc?: string;
	/** Imagen principal del listado (portada en /works, home) */
	img: string;
	alt: string;
	/** Galería en la ficha (mínimo una) */
	gallery: WorkGalleryImage[];
	/** HTML del bloque descriptivo (columna derecha). Usa template `` ` `` para varios `<p>`. */
	detailHtml: string;
};

function g(slug: keyof typeof workGalleries): WorkGalleryItem[] {
	return workGalleries[slug];
}

export const workProjects: WorkProject[] = [
	{
		slug: 'la-sinfonia-del-caos',
		year: '2025',
		title: 'La Sinfonía del Caos',
		desc: 'Collages',
		...(() => {
			const gallery = g('la-sinfonia-del-caos');
			return {
				gallery,
				img: '/images/symphony.webp',
				alt: 'La Sinfonía del Caos — collages'
			};
		})(),
		detailHtml: `
			<p>Nadie dijo que la vida fuera silenciosa. De hecho, a veces es una orquesta sin alma de ruidos cotidianos. Y si eres de los que celebra estar en cada minuto en lugar de luchar contra ello, esta es tu colección.Hacer una colección de collages que hacen referencia a los maravillosos sonidos de nuestro día a día.</p>
			<p><strong>Representación del Ruido y la Energía:</strong> Serie de collages que mezcla recortes pop, señales y animales en escenas de alto contraste. El azul eléctrico y los destellos funcionan como metáfora del estímulo constante y del ritmo urbano.</p>
			<p><strong>Contraste entre Orden y Desorden:</strong> Composiciones que juegan con la simetría rota y capas superpuestas: lo cotidiano se vuelve casi abstracto, invitando a leer cada pieza como un fotograma de un caos controlado.</p>
		`.trim()
	},
	{
		slug: 'womo-brand',
		year: '2024',
		title: 'WOMO Brand',
		desc: 'Branding',
		...(() => {
			const gallery = g('womo-brand');
			return {
				gallery,
				img: '/images/womo.webp',
				alt: 'WOMO Brand — branding'
			};
		})(),
		detailHtml: `
			<p>WOMO es una marca de ropa atemporal y minimalista, comprometida con la alta calidad de sus materiales y la responsabilidad ambiental, rechazando la moda rápida. Ofrece exclusividad y un fuerte sentido de comunidad a clientes que buscan una identidad más allá de la indumentaria. Las prendas están diseñadas para el uso diario, combinando diseño meticuloso con comodidad, durabilidad y versatilidad.</p>
			<p>La solución aportada es una marca minimalista que juega una estética moderna y urbana usando blanco y negro como principales. El uso de colores neutros es una decisión clave, ya que es el epítome de lo atemporal y asegura que la marca no se vea atada a tendencias pasajeras. Esto refuerza la idea de durabilidad y versatilidad de las prendas. La identidad usa mucho espacio negativo, etiquetas sencillas y un packaging reservado. Esto comunica el concepto de exclusividad y de no ser una marca que grita por atención. La marca valora la sutileza por encima del ruido.</p>
		`.trim()
	},
	{
		slug: 'campana-pizzas-goodfellas',
		year: '2025',
		title: "Campaña de pizzas Goodfella's",
		desc: 'Campaña para el lanzamiento de una gama de pizzas precocinadas nuevas de la marca Findus.',
		...(() => {
			const gallery = g('campana-pizzas-goodfellas');
			return {
				gallery,
				img: '/images/goodfellas.avif',
				alt: "Campaña de pizzas Goodfella's"
			};
		})(),
		detailHtml: `
			<p>Diseñar un key-visual y adaptarlo a una variedad de medios y formatos con una creatividad acorde a su brandbook.</p>
			<p><strong>Foco en el Producto:</strong> La composición es limpia y directa. El producto es el "héroe" de la escena ocupando el mayor porcentaje de espacio y evitando las distracciones.</p>
			<p>Usamos una paleta oscura (negros, grises oscuros, tonos ahumados), lo que permite que los colores del producto (amarillos, blancos y rojos) resalten con gran intensidad, haciendo que la comida se vea apetecible y de alta calidad.</p>
		`.trim()
	},
	{
		slug: 'amor-fatum',
		year: '2022',
		title: 'Amor Fatum',
		desc: 'Diseño de perfume',
		...(() => {
			const gallery = g('amor-fatum');
			return {
				gallery,
				img: '/images/amor-fatum.webp',
				alt: 'Amor Fatum — perfume'
			};
		})(),
		detailHtml: `
			<p>Imagina un viaje olfativo que capture la esencia misma de la existencia humana, desde su inicio hasta su plena madurez. Presentamos una innovadora colección de perfumes inspirada en el flujo incesante de un río, donde cada etapa de su recorrido se entrelaza con las fases de la vida de un hombre.</p>
			<p>Concebimos la vida como un río caudaloso, un proceso continuo de experiencias y transformaciones. El hombre, en esta analogía, está representado por las piedras que yacen en su lecho.</p>
			<p>Así como la corriente del agua moldea y pule las rocas a lo largo de su camino, las experiencias y los desafíos de la vida esculpen nuestro carácter y sabiduría.</p>
			<p>La solución de diseño gráfico de "Amor fatum" es conceptual, sofisticada y atmosférica. Se enfoca en traducir la metáfora del río y las rocas pulidas por la vida a un lenguaje visual de lujo. Una marca lujosa, minimalista y orgánica. Se emplea una tipografía serif elegante y clásica en un tamaño reducido y con mucho aire, reforzando la sensación de alta gama y atemporalidad. El diseño utiliza la abstracción y la textura para contar la historia de la marca, elevando el packaging a una pieza de arte conceptual que resuena con el nombre "Amor fatum".</p>
		`.trim()
	},
	{
		slug: 'packaging',
		year: '2023 · 2025',
		title: 'Packaging',
		desc: 'Diseño de ediciones promocionales especiales de libros',
		...(() => {
			const gallery = g('packaging');
			return {
				gallery,
				img: '/images/packaging.webp',
				alt: 'Packaging — ediciones promocionales de libros'
			};
		})(),
		detailHtml: `
			<p>Diseño y en algunos casos, adaptación de creatividades para usarlo en packaging para diversos sectores, incluyendo el editorial, el entretenimiento y productos de consumo.</p>
			<p>Directora creativa: Belén de Pedro.</p>
			<p>Producido en GRUPO AGA.</p>
		`.trim()
	},
	{
		slug: 'carteleria',
		year: '2022 · 2026',
		title: 'Cartelería',
		...(() => {
			const gallery = g('carteleria');
			return {
				gallery,
				img: '/images/carteleria.webp',
				alt: 'Cartelería y gráfica de gran formato — Ángel Lavayen'
			};
		})(),
		detailHtml:
			'<p>Una colección de trabajos de cartelería y gráfica de gran formato, diseñados para captar la atención de manera instantánea y transmitir mensajes claros.</p>'
	},
	{
		slug: 'merchandising-museo-del-traje',
		year: '2022',
		title: 'Merchandising Museo del Traje',
		desc: 'Colección de productos para la tienda de merchandising del MDT',
		...(() => {
			const gallery = g('merchandising-museo-del-traje');
			const t = listThumbnail(gallery);
			return { img: t.src, alt: t.alt, gallery };
		})(),
		detailHtml:
			'<p>Diseñamos una serie de productos basados en algunas de las prendas que se exponen en el Museo Del Traje. El valor de este ejercicio esta en coger obras de élite y transformarlas en productos para masas.</p>'
	},
	{
		slug: 'beauty-pom-pom',
		year: '2025',
		title: 'Beauty Pom Pom',
		desc: 'Sistema visual',
		...(() => {
			const gallery = g('beauty-pom-pom');
			return {
				gallery,
				img: '/images/beauty.webp',
				alt: 'Beauty Pom Pom — sistema visual'
			};
		})(),
		detailHtml: `
			<p>Este proyecto nace de la necesidad de fusionar la delicadeza del sector estético con una identidad visual robusta y sofisticada. Para Pom Pom - Beauty & Cosmetics, se desarrolló un sistema gráfico basado en la elegancia clásica, utilizando una tipografía script de trazos fluidos que evoca la precisión y el detalle de los tratamientos de pestañas y cuidado facial.</p>
			<p>La paleta de colores —compuesta por gris carbón, arena y crema— se aleja de los códigos visuales tradicionales de la belleza para posicionar a la marca en un segmento de lujo orgánico y bienestar consciente. El resultado es una marca versátil, que transmite confianza y profesionalidad en cada punto de contacto, desde la papelería corporativa hasta su presencia digital.</p>
		`.trim()
	},
	{
		slug: 'motion-graphics-video',
		year: '2023 · 2025',
		title: 'Motion Graphics & Vídeo',
		desc: 'Diseño, desarrollo o montaje de productos audiovisuales.',
		...(() => {
			const gallery = g('motion-graphics-video');
			return {
				gallery,
				img: 'https://framerusercontent.com/images/5WxYMrv83dUYz4Bw19cWsTXhAuA.gif?width=800&height=600',
				alt: 'Motion graphics y vídeo — piezas audiovisuales y animación'
			};
		})(),
		detailHtml:
			'<p>Diseño, desarrollo o montaje de productos audiovisuales.</p>'
	},
	{
		slug: 'campanas-digitales',
		year: '2023 · 2024',
		title: 'Campañas digitales',
		desc: 'Banners animados HTML5',
		...(() => {
			const gallery = g('campanas-digitales');
			return {
				gallery,
				img: '/images/campanas-digitales.webp',
				alt: 'Campañas digitales — banners HTML5'
			};
		})(),
		detailHtml:
			'<p>Adaptación y programación de banners HTML para campañas de películas de Warner Bros.</p>'
	},
	{
		slug: 'diseno-editorial',
		year: '2024 · 2025',
		title: 'Diseño editorial',
		desc: 'Maquetación y diseño editorial',
		...(() => {
			const gallery = g('diseno-editorial');
			return {
				gallery,
				img: '/images/diseno-editorial.webp',
				alt: 'Diseño editorial'
			};
		})(),
		detailHtml: `
			<p><strong>2024 · 2025</strong> · Varios</p>
			<p>Muestro dominio en el diseño de folletos corporativos (como el proyecto Tiimi), catálogos de productos (como Invati Ultra Advanced) y otros documentos de comunicación visual. Mi trabajo se centra en traducir la identidad de marca a formatos editoriales coherentes, garantizando una maquetación óptima y preparando archivos con precisión técnica para la imprenta (CMYK, sangrados y cortes), asegurando un resultado final de alta calidad.</p>
			<p>Directora creativa: Belén de Pedro.</p>
			<p>Producido en GRUPO AGA.</p>
		`.trim()
	},
	{
		slug: 'pio-pio',
		year: '2023',
		title: 'Pío Pío',
		...(() => {
			const gallery = g('pio-pio');
			return {
				gallery,
				img: '/images/pio-pio.webp',
				alt: 'Pío Pío — branding infantil para calzado'
			};
		})(),
		detailHtml:
			'<p>"Pío Pío" nació con la idea de crear un mundo de fantasía para los niños a través de sus zapatos. La paleta de colores cálida y vibrante, inspirada en los juegos al aire libre y los paisajes infantiles, transmite alegría y energía. El pollito, un personaje entrañable y lleno de vida, se convierte en el compañero ideal para las aventuras. La tipografía infantil y atrevida, diseñada especialmente para la marca, le da un toque de diversión y legibilidad, haciendo que los productos sean irresistibles para los pequeños. A través de este proyecto, buscamos construir una marca que no solo ofrezca calzado de calidad, sino que también fomente la imaginación y la creatividad de los más pequeños.</p>'
	},
	{
		slug: 'lesj-centro-estetico',
		year: '2023',
		title: 'LESJ Centro estético',
		desc: 'Branding',
		...(() => {
			const gallery = g('lesj-centro-estetico');
			return {
				gallery,
				img: '/images/lesj.webp',
				alt: 'LESJ Centro estético — branding'
			};
		})(),
		detailHtml: `
			<p>LESJ™ es una clínica de estética que prioriza la salud mental para lograr resultados físicos satisfactorios y duraderos. Combinamos medicina estética convencional con terapia psicológica.</p>
			<p>Nuestra filosofía se basa en cuatro pilares de vida (Nutrición, Ejercicio, Reducción del Estrés y Calidad del Sueño), los cuales son la base para la salud. Guiamos a los clientes a mejorar estos hábitos, ya que ningún tratamiento es más efectivo.</p>
			<p>El ícono principal es la abstracción de una hoja, que simboliza el crecimiento, el bienestar natural y la vida. Esta forma orgánica transmite la idea de un enfoque saludable y equilibrado. El símbolo de la hoja está segmentado en cuatro partes que se tocan o engranan sutilmente, representando los cuatro pilares fundamentales que deben estar en equilibrio para el bienestar del cliente. Se utiliza una tipografía moderna, limpia y sans-serif (sin serifa), con un peso de línea delgado, lo que aporta una sensación de sofisticación, limpieza y minimalismo.</p>
		`.trim()
	},
	{
		slug: 'shimano-days',
		year: '2023 · 2025',
		title: 'Shimano Days',
		desc: 'Diseño de diversas piezas para un evento interno de novedades de Shimano.',
		...(() => {
			const gallery = g('shimano-days');
			return {
				gallery,
				img: '/images/shimano.webp',
				alt: 'Shimano Days — evento Shimano'
			};
		})(),
		detailHtml: `
			<p>El desafío consistió en diseñar un logo distintivo que capturara la esencia tanto del evento como de la marca. Además, había que desarrollar una amplia gama de materiales visuales, desde invitaciones y folletos hasta señalización y contenido digital, asegurando una experiencia coherente y atractiva para los colaboradores.</p>
			<p>Presentemos un diseño moderno y funcional, con una sensación de energía y movimiento constante, muy apropiado para el mundo del ciclismo. Un sistema visual que se adapta a diversos formatos (invitaciones, señalización, contenido digital). Se opta por una tipografía sans-serif de palo seco, limpia y de alta legibilidad, lo que comunica eficiencia, tecnología y velocidad.</p>
			<p>Directora creativa: Belén de Pedro.</p>
			<p>Producido en GRUPO AGA.</p>
		`.trim()
	},
	{
		slug: 'diseno-ambiental',
		year: '2023 · 2025',
		title: 'Diseño ambiental',
		desc: 'Diseño de piezas decorativas para las oficinas de AMADEUS',
		...(() => {
			const gallery = g('diseno-ambiental');
			return {
				gallery,
				img: '/images/diseno-ambiental.webp',
				alt: 'Diseño ambiental — oficinas AMADEUS'
			};
		})(),
		detailHtml: `
			<p>Diseño e implementación de gráfica ambiental para la sede de Amadeus en Madrid. El proyecto consistió en la conceptualización y producción de vinilos de gran formato que integran la identidad de la marca con referencias al arte pop y contemporáneo. A través de la reinterpretación de iconos artísticos, logramos humanizar los espacios de trabajo, dotándolos de una personalidad única que refuerza los valores de innovación, exploración y colaboración de la compañía.</p>
			<p>Directora creativa: Belén de Pedro.</p>
			<p>Producido en GRUPO AGA.</p>
		`.trim()
	}
];

export function getWorkBySlug(slug: string): WorkProject | undefined {
	return workProjects.find((p) => p.slug === slug);
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
	const i = workProjects.findIndex((p) => p.slug === slug);
	if (i === -1) return null;
	return {
		current: workProjects[i],
		prev: i > 0 ? workProjects[i - 1]! : null,
		next: i < workProjects.length - 1 ? workProjects[i + 1]! : null
	};
}