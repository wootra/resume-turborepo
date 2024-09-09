import { z } from 'astro:content';

const blogSchema = z.object({
	title: z.string(),
	author: z.string().default('Songhyeon Jun(Songhyeon Jun@gmail.com)'),
	tags: z.array(z.string()),
	pubDate: z.date(),
	description: z.string(),
	isDraft: z.boolean().optional(),
	sortOrder: z.number().default(-1),
});

export default blogSchema;
