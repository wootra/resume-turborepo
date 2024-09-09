import blogSchema from '@/schema/blogSchema';
import { defineCollection } from 'astro:content';

const blogCollection = defineCollection({
	type: 'content',
	schema: blogSchema,
});

export const collections = {
	blog: blogCollection,
};
