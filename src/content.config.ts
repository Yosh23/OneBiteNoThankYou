import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/recipes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Sides', 'Drinks', 'Snacks', 'Basics']),
    tags: z.array(z.string()).default([]),
    servings: z.number(),
    prepTime: z.number().describe('in minutes'),
    cookTime: z.number().describe('in minutes'),
    // Other recipes (by filename/id, no .md extension) that this recipe builds on.
    // The reverse "used in" relationship is derived automatically at build time.
    uses: z.array(z.string()).default([]),
    ingredients: z.array(
      z.object({
        amount: z.number().nullable().default(null),
        unit: z.string().default(''),
        name: z.string().optional(),
        // Section-only entries have no amount/name, just section.
        section: z.string().optional(),
      })
    ).refine(
      (items) => items.every((i) => i.name !== undefined || i.section !== undefined),
      { message: 'Each ingredient must have a name, or be a section header.' }
    ),
    notes: z.string().optional(),
    source: z.string().optional(),
    addedBy: z.string().optional(),
    dateAdded: z.date().optional(),
  }),
});

export const collections = { recipes };
