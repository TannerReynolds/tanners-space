import fs from 'fs';
import path from 'path';

export async function load() {
	const galleryPath = 'static/Gallery';
	const categories = fs.readdirSync(galleryPath).filter((f) => fs.statSync(path.join(galleryPath, f)).isDirectory());

	let images = [];
	for (const category of categories) {
		const folder = path.join(galleryPath, category);
		const files = fs.readdirSync(folder).filter((f) => f.endsWith('COMP.jpg'));

		for (const file of files) {
			const base = file.replace('COMP.jpg', '');
			images.push({
				category,
				thumb: `/Gallery/${category}/${base}COMP.jpg`,
				full: `/Gallery/${category}/${base}.jpg`
			});
		}
	}

	return { categories, images };
}