/**
 * Copia imágenes/vídeo de IMAGES lavayen/TRABAJOS → public/images/works/<slug>/
 * y genera src/data/work-galleries.ts (rutas y textos alt).
 * Ejecución: node scripts/sync-trabajos-assets.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve('IMAGES lavayen/TRABAJOS');
const OUT_ROOT = path.resolve('public/images/works');
const GEN = path.resolve('src/data/work-galleries.ts');

const SLUG_TITLES = {
	'la-sinfonia-del-caos': 'La Sinfonía del Caos',
	'womo-brand': 'WOMO Brand',
	'campana-pizzas-goodfellas': "Campaña de pizzas Goodfella's",
	'amor-fatum': 'Amor Fatum',
	packaging: 'Packaging',
	carteleria: 'Cartelería',
	'merchandising-museo-del-traje': 'Merchandising Museo del Traje',
	'beauty-pom-pom': 'Beauty Pom Pom',
	'motion-graphics-video': 'Motion graphics y vídeo',
	'campanas-digitales': 'Campañas digitales',
	'diseno-editorial': 'Diseño editorial',
	'pio-pio': 'Pío Pío',
	'lesj-centro-estetico': 'LESJ Centro estético',
	'shimano-days': 'Shimano Days',
	'diseno-ambiental': 'Diseño ambiental'
};

const IMAGE_EXT = new Set(['.webp', '.jpg', '.jpeg', '.png', '.gif', '.avif', '.apng', '.avif']);
const isImageFile = (n) => IMAGE_EXT.has(path.extname(n).toLowerCase());

const natural = (a, b) => a.localeCompare(b, 'es', { numeric: true, sensitivity: 'base' });

function pickWarnerSubsets(files) {
	const isMotion = (name) =>
		/\.mp4$/i.test(name) ||
		/^animacion\.gif$/i.test(name) ||
		(/Mesa de trabajo/.test(name) && /\.webp$/i.test(name));
	const motion = files.filter((f) => isMotion(f));
	const camp = files.filter((f) => !isMotion(f) && isImageFile(f));
	const orderMotion = (arr) => {
		const mp4 = arr.find((f) => f.endsWith('.mp4') || f.endsWith('.MP4'));
		const gif = arr.find((f) => /\.gif$/i.test(f));
		const mesas = arr.filter((f) => f.includes('Mesa de trabajo')).sort(natural);
		return [mp4, gif, ...mesas].filter(Boolean);
	};
	return { motion: orderMotion(motion), camp: camp.sort(natural) };
}

/** Un slug → lista de nombres de archivo (fuente) en orden, o 'fromDir' con filtro. */
const PLAN = [
	{ slug: 'la-sinfonia-del-caos', fromPrefix: (n) => n.startsWith('01 ') },
	{ slug: 'womo-brand', fromPrefix: (n) => n.startsWith('02 ') },
	{ slug: 'campana-pizzas-goodfellas', fromPrefix: (n) => n.startsWith('03 ') },
	{ slug: 'amor-fatum', fromPrefix: (n) => n.startsWith('04 ') },
	{ slug: 'packaging', fromPrefix: (n) => n.startsWith('05 ') },
	{ slug: 'carteleria', fromPrefix: (n) => n.startsWith('06 ') },
	{ slug: 'merchandising-museo-del-traje', fromPrefix: (n) => n.startsWith('07 ') },
	{ slug: 'beauty-pom-pom', fromPrefix: (n) => n.startsWith('08 ') },
	{ slug: 'motion-graphics-video', fromPrefix: (n) => n.startsWith('10 '), warner: 'motion' },
	{ slug: 'campanas-digitales', fromPrefix: (n) => n.startsWith('10 '), warner: 'camp' },
	{ slug: 'diseno-editorial', fromPrefix: (n) => n.startsWith('11 ') },
	{ slug: 'pio-pio', fromPrefix: (n) => n.startsWith('12 ') },
	{ slug: 'lesj-centro-estetico', fromPrefix: (n) => n.startsWith('13 ') },
	{ slug: 'shimano-days', fromPrefix: (n) => n.startsWith('14 ') },
	{ slug: 'diseno-ambiental', fromPrefix: (n) => n.startsWith('15 ') }
];

function mediaForFile(name) {
	if (/\.mp4$/i.test(name)) return 'video';
	return 'image';
}

function esc(s) {
	return JSON.stringify(s);
}

async function onlyFilesWithStat(dirPath) {
	const names = await fs.readdir(dirPath);
	const out = [];
	for (const n of names) {
		if (n.startsWith('.') || n === '.DS_Store') continue;
		const fpath = path.join(dirPath, n);
		const st = await fs.stat(fpath);
		if (st.isFile()) out.push(n);
	}
	return out;
}

function destName(i, ext) {
	return String(i + 1).padStart(2, '0') + ext;
}

async function main() {
	const parents = await fs.readdir(ROOT);
	for (const step of PLAN) {
		const dirName = parents.find((n) => step.fromPrefix(n));
		if (!dirName) {
			throw new Error(`Carpeta no encontrada para ${step.slug} (prueba: ${String(step.fromPrefix)} )`);
		}
		const srcDir = path.join(ROOT, dirName);
		let fileNames;
		if (step.warner) {
			const all = (await onlyFilesWithStat(srcDir)).sort(natural);
			const { motion, camp } = pickWarnerSubsets(all);
			fileNames = step.warner === 'motion' ? motion : camp;
			if (fileNames.length === 0) throw new Error(`Warner ${step.warner} vacío`);
		} else {
			const all = await onlyFilesWithStat(srcDir);
			const imagesAndVideo = all.filter(
				(f) => isImageFile(f) || /\.mp4$/i.test(f) || /\.mov$/i.test(f)
			);
			if (step.slug === 'packaging') {
				const portada = imagesAndVideo.find((f) => /PORTADA/i.test(f));
				const rest = imagesAndVideo.filter((f) => f !== portada).sort(natural);
				fileNames = portada ? [portada, ...rest] : imagesAndVideo.sort(natural);
			} else if (step.slug === 'diseno-ambiental') {
				const nonVid = imagesAndVideo.filter((f) => !/\.mp4$/i.test(f) && !/\.mov$/i.test(f));
				const vids = imagesAndVideo.filter((f) => /\.mp4$/i.test(f) || /\.mov$/i.test(f));
				fileNames = [...nonVid.sort(natural), ...vids];
			} else {
				fileNames = imagesAndVideo.sort(natural);
			}
		}

		/* La Sinfonía: omitir la primera pieza (orden alfabeto/natural) en web */
		if (step.slug === 'la-sinfonia-del-caos' && fileNames.length > 0) {
			fileNames = fileNames.slice(1);
		}

		const slug = step.slug;
		const outDir = path.join(OUT_ROOT, slug);
		await fs.rm(outDir, { recursive: true, force: true });
		await fs.mkdir(outDir, { recursive: true });

		const title = SLUG_TITLES[slug];
		if (!title) throw new Error(`Falta título para ${slug}`);

		const items = [];
		for (let i = 0; i < fileNames.length; i++) {
			const fn = fileNames[i];
			const ext = path.extname(fn) || (fn.toLowerCase().endsWith('.mp4') ? '.mp4' : '');
			const dname = destName(i, ext.toLowerCase());
			await fs.copyFile(path.join(srcDir, fn), path.join(outDir, dname));
			const m = mediaForFile(fn);
			const alt = `${title} — ${i + 1} de ${fileNames.length}`;
			items.push({ src: `/images/works/${slug}/${dname}`, alt, media: m });
		}
		step._items = items;
	}

	// Escribir TS
	const lines = [];
	lines.push('/** @generated by scripts/sync-trabajos-assets.mjs — no editar a mano */');
	lines.push("import type { WorkGalleryItem } from './work-gallery-types';");
	lines.push('');
	lines.push('export const workGalleries: Record<string, WorkGalleryItem[]> = {');
	for (const step of PLAN) {
		lines.push(`\t${esc(step.slug)}: [`);
		for (const it of step._items) {
			const med =
				it.media === 'video'
					? `, media: 'video'`
					: '';
			lines.push(`\t\t{ src: ${esc(it.src)}, alt: ${esc(it.alt)}${med} },`);
		}
		lines.push('\t],');
	}
	lines.push('};');
	lines.push('');
	await fs.writeFile(GEN, lines.join('\n') + '\n', 'utf8');
	console.log('OK:', GEN);
	console.log('OK:', OUT_ROOT);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
