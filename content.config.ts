import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',

      schema: z.object({
        title: z.string(),
        description: z.string(),

        category: z.string(),

        tags: z.array(z.string()).default([]),
        stack: z.array(z.string()).default([]),

        cover: z.string(),

        featured: z.boolean().default(false),

        order: z.number().default(999),

        year: z.union([
          z.number(),
          z.string()
        ]).optional(),
        client: z.string().optional(),
        website: z.string().optional(),
        github: z.string().optional(),

        status: z
          .enum(['completed', 'ongoing', 'experimental'])
          .default('completed')
      })
    })
  }
})
