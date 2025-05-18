import fs from 'fs';
import path from 'path';
import markdownit from 'markdown-it';

const md = markdownit({
	html: true,
	linkify: true,
	typographer: true
});

export async function load({ params }) {
	const { category, slug } = params;
	const decodedSlug = decodeURIComponent(slug); 
	const fullPath = path.resolve(`static/Blog/${category}/${decodedSlug}`);

	if (!fs.existsSync(fullPath)) {
		throw error(404, `Blog post not found: ${category}/${decodedSlug}`);
	}

	const raw = fs.readFileSync(fullPath, 'utf-8');

	const dateMatch = raw.match(/<!--\s*(\d{4}-\d{2}-\d{2})\s*-->/);
	const date = dateMatch ? dateMatch[1] : null;

	const markdown = raw.replace(/<!--.*?-->/, '').trim();
	const html = md.render(markdown);

	return {
		title: decodedSlug.replace(/\.md$/, ''),
		category,
		date,
		html
	};
}