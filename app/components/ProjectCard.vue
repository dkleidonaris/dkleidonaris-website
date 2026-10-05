<script setup lang="ts">
defineProps<{
  project: {
    path: string
    title: string
    description: string
    category: string
    cover: string
    stack?: string[]
    tags?: string[]
    year?: number
  }
}>()
</script>

<template>
  <NuxtLink :to="project.path" class="group block">
    <article>
      <div class="relative aspect-[4/3] overflow-hidden rounded-[2rem]
               border border-default bg-elevated">
        <NuxtImg :src="project.cover" :alt="project.title" class="
    h-[115%] w-full
    object-cover object-top
    transition duration-700 ease-out
    group-hover:scale-[1.03]
  " />

        <div class="absolute inset-0 bg-gradient-to-t
                 from-black/45 via-black/0 to-transparent
                 opacity-70" />

        <div class="absolute bottom-5 left-5 flex items-center gap-2">
          <UBadge color="neutral" variant="solid" class="bg-white/90 text-black backdrop-blur">
            {{ project.category }}
          </UBadge>

          <UBadge v-if="project.year" color="neutral" variant="solid" class="bg-white/90 text-black backdrop-blur">
            {{ project.year }}
          </UBadge>
        </div>

        <div class="absolute right-5 top-5 flex size-12 items-center justify-center
                 rounded-full bg-white text-black shadow-lg
                 transition duration-300
                 group-hover:-translate-y-1 group-hover:translate-x-1">
          <UIcon name="i-lucide-arrow-up-right" class="size-5" />
        </div>
      </div>

      <div class="mt-6">
        <h2 class="text-3xl font-semibold tracking-[-0.03em]
                 md:text-4xl">
          {{ project.title }}
        </h2>

        <p class="mt-3 max-w-xl text-base leading-7 text-muted">
          {{ project.description }}
        </p>

        <div v-if="project.stack?.length" class="mt-5 flex flex-wrap gap-2">
          <UBadge v-for="item in project.stack.slice(0, 4)" :key="item" color="neutral" variant="subtle">
            {{ item }}
          </UBadge>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>
