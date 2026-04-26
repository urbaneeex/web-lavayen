/** Ruta pública bajo /public. `media: 'video'` para .mp4 (reproductor de vídeo en la ficha). */
export type WorkGalleryItem = {
	src: string;
	alt: string;
	/** Si no se indica, se trata como imagen (incl. gif en &lt;img&gt;). */
	media?: 'image' | 'video';
};
