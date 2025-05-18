export async function loadGalleryImages() {
	const res = await fetch('/api/gallery-images');
	const data = await res.json();
	return data.allImages;
}
