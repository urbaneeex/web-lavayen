/**
 * Rasteriza public/favicon.svg y escribe public/favicon.ico (16, 32, 48 px).
 * Ejecutar tras cambiar el SVG: npm run generate:favicon
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const svgPath = path.join(root, 'public', 'favicon.svg');
const icoPath = path.join(root, 'public', 'favicon.ico');

/** Sharp no aplica `prefers-color-scheme`; el .ico va en blanco (pestañas / fondos oscuros). */
function svgForIcoWhite(svgSource) {
	const withoutStyle = svgSource.replace(/<style>[\s\S]*?<\/style>\s*/g, '');
	return withoutStyle.replace(/<path\s+([\s\S]*?)\s*\/>/, (_full, inner) => {
		const innerNoFill = inner.replace(/\s*fill="[^"]*"/g, '').trim();
		return `<path ${innerNoFill} fill="#ffffff" />`;
	});
}

const svgWhite = svgForIcoWhite(fs.readFileSync(svgPath, 'utf8'));

const sizes = [16, 32, 48];
const pngBuffers = await Promise.all(
	sizes.map((size) =>
		sharp(Buffer.from(svgWhite)).resize(size, size).png({ compressionLevel: 9 }).toBuffer()
	)
);

const ico = await pngToIco(pngBuffers);
fs.writeFileSync(icoPath, ico);
console.log('Wrote', icoPath, `(${sizes.join(', ')} px)`);
