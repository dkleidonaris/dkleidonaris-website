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
  }

  index: number
}>()
</script>

<template>
  <article class="project-card grid items-center gap-12
           lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
    <NuxtLink :to="project.path" class="group relative aspect-[4/3] overflow-hidden
             rounded-[2rem] border border-default">
      <NuxtImg :src="project.cover" :alt="project.title" class="project-visual-inner size-full object-cover" />

      <div class="absolute inset-0 bg-gradient-to-tr
               from-black/25 via-transparent to-transparent" />

      <div class="absolute bottom-5 left-5 rounded-full
               bg-black/70 px-4 py-2 text-xs text-white
               backdrop-blur">
        0{{ index + 1 }}
      </div>
    </NuxtLink>

    <div>
      <div class="text-xs uppercase tracking-[.25em] text-primary">
        0{{ index + 1 }} / {{ project.category }}
      </div>

      <h3 class="mt-5 text-5xl font-semibold tracking-[-0.05em]
               md:text-7xl">
        {{ project.title }}
      </h3>

      <p class="mt-7 max-w-xl text-lg leading-8 text-muted">
        {{ project.description }}
      </p>

      <div class="mt-7 flex flex-wrap gap-2">
        <UBadge v-for="item in project.stack?.slice(0, 5)" :key="item" color="neutral" variant="subtle">
          {{ item }}
        </UBadge>
      </div>

      <UButton :to="project.path" class="mt-9" color="neutral" variant="link" trailing-icon="i-lucide-arrow-up-right">
        View case study
      </UButton>
    </div>
  </article>
</template>
