/**
 * Regenera public/images/og-social.webp (~1200×630) desde lavayen-pic.webp.
 * Uso: npm run generate:og
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const src = path.join(root, 'public', 'images', 'lavayen-pic.webp');
const out = path.join(root, 'public', 'images', 'og-social.webp');

if (!fs.existsSync(src)) {
	console.error('Missing', src);
	process.exit(1);
}

await sharp(src)
	.resize(1200, 630, { fit: 'cover', position: 'attention' })
	.webp({ quality: 88 })
	.toFile(out);

console.log('Wrote', out);
