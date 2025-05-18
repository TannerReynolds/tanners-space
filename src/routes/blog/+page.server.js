import fs from 'fs';
import path from 'path';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const blogDir = path.resolve('static/Blog');

	// Get all folders in /Blog (each one is a category)
	const categories = fs.readdirSync(blogDir).filter((folder) =>
		fs.statSync(path.join(blogDir, folder)).isDirectory()
	);

	const posts = [];

	for (const category of categories) {
		const folderPath = path.join(blogDir, category);
		const files = fs.readdirSync(folderPath).filter((f) => f.endsWith('.md'));

		for (const file of files) {
			const filePath = path.join(folderPath, file);
			const content = fs.readFileSync(filePath, 'utf-8');

			const match = content.match(/<!--\s*(\d{4}-\d{2}-\d{2})\s*-->/);
			const date = match ? match[1] : 'Unknown Date';

			const preview = content.replace(/<!--.*?-->/, '').trim().slice(0, 256) + '...';
			const title = file.replace(/\.md$/, '');
			const slug = encodeURIComponent(file); // handle spaces safely

			posts.push({
				title,
				date,
				preview,
				category,
				slug: `/blog/${category}/${slug}` // full URL to use in <a href>
			});
		}
	}

	posts.sort((a, b) => new Date(b.date) - new Date(a.date));

	return {
		posts,
		categories
	};
}