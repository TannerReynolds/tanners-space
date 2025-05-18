import fs from 'fs';
import path from 'path';

export async function load() {
	const galleryPath = 'static/Gallery';
	const categories = fs.readdirSync(galleryPath).filter((f) => fs.statSync(path.join(galleryPath, f)).isDirectory());

	let allImages = [];
	for (const category of categories) {
		const folder = path.join(galleryPath, category);
		const files = fs.readdirSync(folder);

		for (const file of files) {
			if (file.endsWith('.jpg')) {
				allImages.push(`/Gallery/${category}/${file}`);
			}
		}
	}

	return { allImages };
}