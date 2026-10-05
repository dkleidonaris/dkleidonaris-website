<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const selectedCategory = ref('All')
const page = ref<HTMLElement | null>(null)

const { data: projects } = await useAsyncData(
  'all-projects',
  () =>
    queryCollection('projects')
      .order('order', 'ASC')
      .all()
)

const categories = computed(() => {
  if (!projects.value) {
    return ['All']
  }

  return [
    'All',
    ...new Set(
      projects.value
        .map(project => project.category)
        .filter(Boolean)
    )
  ]
})

const filteredProjects = computed(() => {
  if (!projects.value) {
    return []
  }

  if (selectedCategory.value === 'All') {
    return projects.value
  }

  return projects.value.filter(
    project => project.category === selectedCategory.value
  )
})

useSeoMeta({
  title: 'Projects — Dimitris Kleidonaris',
  description:
    'Selected web applications, platforms, APIs, AI systems and digital products.'
})

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out'
      }
    })

    tl.from('.projects-eyebrow', {
      y: 20,
      opacity: 0,
      duration: 0.6
    })
      .from(
        '.projects-title',
        {
          y: 70,
          opacity: 0,
          duration: 0.9
        },
        '-=0.3'
      )
      .from(
        '.projects-description',
        {
          y: 30,
          opacity: 0,
          duration: 0.7
        },
        '-=0.5'
      )
      .from(
        '.projects-filters',
        {
          y: 20,
          opacity: 0,
          duration: 0.6
        },
        '-=0.4'
      )

    gsap.from('.project-card', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      delay: 0.3,
      ease: 'power3.out'
    })
  }, page.value)

  onUnmounted(() => {
    ctx.revert()
  })
})

watch(selectedCategory, async () => {
  await nextTick()

  gsap.fromTo(
    '.project-card',
    {
      y: 25,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.06,
      ease: 'power2.out'
    }
  )
})
</script>

<template>
  <div ref="page" class="min-h-screen">
    <UContainer class="pb-32 pt-36 md:pt-44">
      <!-- HEADER -->
      <header class="max-w-5xl">
        <div class="projects-eyebrow text-xs uppercase tracking-[0.3em] text-primary">
          Work / Projects
        </div>

        <div class="overflow-hidden">
          <h1
            class="projects-title mt-6 text-[clamp(4.5rem,10vw,9rem)] font-semibold leading-[0.85] tracking-[-0.075em]">
            Projects.
          </h1>
        </div>

        <p class="projects-description mt-10 max-w-2xl text-lg leading-8 text-muted md:text-xl">
          A selection of platforms, applications and digital
          systems I've designed and built — from hospitality and
          aerospace to event management and AI.
        </p>
      </header>

      <!-- FILTER -->
      <div class="projects-filters mt-16 flex flex-wrap gap-2 border-b border-default pb-8">
        <UButton v-for="category in categories" :key="category" :variant="selectedCategory === category
          ? 'solid'
          : 'ghost'
          " :color="selectedCategory === category
            ? 'primary'
            : 'neutral'
            " @click="selectedCategory = category">
          {{ category }}
        </UButton>
      </div>

      <!-- GRID -->
      <TransitionGroup name="projects" tag="div" class="mt-20 grid gap-x-10 gap-y-24 md:grid-cols-2">
        <NuxtLink v-for="(project, index) in filteredProjects" :key="project.path" :to="project.path"
          class="project-card group block" :class="{
            'md:mt-24': index % 2 === 1
          }">
          <!-- IMAGE -->
          <div class="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-default bg-elevated">
            <NuxtImg :src="project.cover" :alt="project.title" class="
    h-[115%] w-full
    object-cover object-top
    transition duration-700 ease-out
    group-hover:scale-[1.03]
  " />

            <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            <!-- INDEX -->
            <div
              class="absolute bottom-5 left-5 rounded-full bg-black/60 px-4 py-2 text-xs text-white backdrop-blur-md">
              {{ String(index + 1).padStart(2, '0') }}
            </div>

            <!-- ARROW -->
            <div
              class="absolute right-5 top-5 flex size-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
              <UIcon name="i-lucide-arrow-up-right" class="size-5" />
            </div>
          </div>

          <!-- INFO -->
          <div class="mt-7">
            <div class="flex items-center justify-between gap-6">
              <div class="text-xs uppercase tracking-[0.2em] text-primary">
                {{ project.category }}
              </div>

              <div v-if="project.year" class="text-sm text-dimmed">
                {{ project.year }}
              </div>
            </div>

            <h2
              class="mt-4 text-3xl font-semibold tracking-[-0.04em] transition-colors group-hover:text-primary md:text-4xl">
              {{ project.title }}
            </h2>

            <p class="mt-4 max-w-xl leading-7 text-muted">
              {{ project.description }}
            </p>

            <div v-if="project.stack?.length" class="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              <span v-for="item in project.stack.slice(0, 5)" :key="item" class="text-sm text-dimmed">
                {{ item }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </TransitionGroup>

      <!-- EMPTY -->
      <div v-if="!filteredProjects.length" class="py-32 text-center text-muted">
        No projects in this category yet.
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.projects-move,
.projects-enter-active,
.projects-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}

.projects-enter-from,
.projects-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.projects-leave-active {
  position: absolute;
}
</style>
