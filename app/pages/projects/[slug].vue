<script setup lang="ts">
const route = useRoute()

const showProjectCta = ref(false)
const projectCtaDismissed = ref(false)

/*
|--------------------------------------------------------------------------
| Project
|--------------------------------------------------------------------------
*/

const { data: project } = await useAsyncData(
  `project-${route.params.slug}`,
  () =>
    queryCollection('projects')
      .path(`/projects/${route.params.slug}`)
      .first()
)

if (!project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Project not found'
  })
}

/*
|--------------------------------------------------------------------------
| SEO
|--------------------------------------------------------------------------
*/

useSeoMeta({
  title: project.value.title,
  description: project.value.description,

  ogTitle: project.value.title,
  ogDescription: project.value.description,
  ogImage: project.value.cover
})

/*
|--------------------------------------------------------------------------
| Floating CTA
|--------------------------------------------------------------------------
*/

const handleScroll = () => {
  if (projectCtaDismissed.value) {
    return
  }

  const scrollTop = window.scrollY

  const documentHeight =
    document.documentElement.scrollHeight -
    window.innerHeight

  if (documentHeight <= 0) {
    showProjectCta.value = false
    return
  }

  const progress =
    scrollTop / documentHeight

  /*
   * Show between 42% and 90%
   * of the project page.
   */
  showProjectCta.value =
    progress >= 0.42 &&
    progress <= 0.90
}

const dismissProjectCta = () => {
  projectCtaDismissed.value = true
  showProjectCta.value = false
}

onMounted(() => {
  window.addEventListener(
    'scroll',
    handleScroll,
    { passive: true }
  )

  window.addEventListener(
    'resize',
    handleScroll,
    { passive: true }
  )

  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener(
    'scroll',
    handleScroll
  )

  window.removeEventListener(
    'resize',
    handleScroll
  )
})
</script>

<template>
  <article v-if="project">
    <!-- PROJECT HERO -->
    <UContainer class="pb-20 pt-36">
      <UButton to="/projects" icon="i-lucide-arrow-left" variant="ghost" color="neutral" class="mb-16">
        All projects
      </UButton>

      <div class="
          grid gap-12
          lg:grid-cols-[1.2fr_.8fr]
        ">
        <!-- TITLE -->
        <div>
          <div class="
              text-xs uppercase
              tracking-[.3em]
              text-primary
            ">
            {{ project.category }}
          </div>

          <h1 class="
              mt-6
              text-6xl font-semibold
              tracking-[-0.065em]
              md:text-8xl
            ">
            {{ project.title }}
          </h1>
        </div>

        <!-- DESCRIPTION -->
        <div class="flex items-end">
          <div>
            <p class="
                max-w-xl
                text-lg leading-8
                text-muted
                md:text-xl
              ">
              {{ project.description }}
            </p>

            <div v-if="project.stack?.length" class="mt-7 flex flex-wrap gap-2">
              <UBadge v-for="item in project.stack" :key="item" color="neutral" variant="subtle">
                {{ item }}
              </UBadge>
            </div>
          </div>
        </div>
      </div>
    </UContainer>

    <!-- COVER -->
    <UContainer>
      <div class="
          relative
          aspect-[16/9]
          overflow-hidden
          rounded-[2rem]
          border border-default
          bg-elevated
        ">
        <NuxtImg :src="project.cover" :alt="project.title" class="
            size-full
            object-cover
            object-top
          " />
      </div>
    </UContainer>

    <!-- CONTENT -->
    <UContainer class="py-24">
      <div class="
          grid gap-16
          lg:grid-cols-[240px_minmax(0,1fr)]
        ">
        <!-- META -->
        <aside>
          <div class="sticky top-28 space-y-8">
            <!-- CLIENT -->
            <div v-if="project.client">
              <div class="
                  text-xs uppercase
                  tracking-[.2em]
                  text-dimmed
                ">
                Client
              </div>

              <div class="mt-2 text-sm">
                {{ project.client }}
              </div>
            </div>

            <!-- YEAR -->
            <div v-if="project.year">
              <div class="
                  text-xs uppercase
                  tracking-[.2em]
                  text-dimmed
                ">
                Year
              </div>

              <div class="mt-2 text-sm">
                {{ project.year }}
              </div>
            </div>

            <!-- CATEGORY -->
            <div>
              <div class="
                  text-xs uppercase
                  tracking-[.2em]
                  text-dimmed
                ">
                Category
              </div>

              <div class="mt-2 text-sm">
                {{ project.category }}
              </div>
            </div>

            <!-- STATUS -->
            <div v-if="project.status">
              <div class="
                  text-xs uppercase
                  tracking-[.2em]
                  text-dimmed
                ">
                Status
              </div>

              <div class="mt-2 text-sm capitalize">
                {{ project.status }}
              </div>
            </div>

            <!-- ACTIONS -->
            <div class="
                flex flex-col
                items-start gap-3
              ">
              <UButton v-if="project.website" :to="project.website" target="_blank" color="neutral" variant="outline"
                trailing-icon="i-lucide-external-link">
                Visit website
              </UButton>

              <UButton v-if="project.github" :to="project.github" target="_blank" color="neutral" variant="outline"
                icon="i-simple-icons-github">
                View source
              </UButton>
            </div>
          </div>
        </aside>

        <!-- MARKDOWN BODY -->
        <div class="max-w-3xl">
          <ContentRenderer :value="project" class="project-content" />
        </div>
      </div>
    </UContainer>

    <!-- GALLERY -->
    <UContainer v-if="project.gallery?.length" class="pb-32">
      <div class="space-y-12">
        <figure v-for="image in project.gallery" :key="image.src">
          <div class="
              overflow-hidden
              rounded-[2rem]
              border border-default
              bg-elevated
            ">
            <NuxtImg :src="image.src" :alt="image.alt" class="
                w-full
                object-cover
              " />
          </div>

          <figcaption v-if="image.caption" class="
              mt-3
              text-sm
              text-muted
            ">
            {{ image.caption }}
          </figcaption>
        </figure>
      </div>
    </UContainer>

    <!-- FLOATING PROJECT CTA -->
    <Transition name="project-popup">
      <div v-if="showProjectCta" class="
          fixed
          bottom-6
          right-6
          z-50
          w-[calc(100%-3rem)]
          max-w-sm
          rounded-2xl
          border border-default
          bg-default/90
          p-5
          shadow-2xl
          backdrop-blur-xl
        ">
        <div class="flex items-start gap-4">
          <div class="min-w-0 flex-1">
            <!-- EYEBROW -->
            <div class="
                flex items-center gap-2
                text-xs uppercase
                tracking-[0.22em]
                text-primary
              ">
              <span class="
                  size-2
                  shrink-0
                  rounded-full
                  bg-primary
                  animate-pulse
                " />

              Have a similar idea?
            </div>

            <!-- TITLE -->
            <h3 class="
                mt-3
                text-xl
                font-semibold
                tracking-tight
              ">
              Let’s build something similar.
            </h3>

            <!-- DESCRIPTION -->
            <p class="
                mt-2
                text-sm
                leading-6
                text-muted
              ">
              If this project is close to what you have in mind,
              let’s discuss what your version could look like.
            </p>

            <!-- CTA -->
            <div class="mt-5">
              <UButton to="mailto:d@dkleidonaris.com" size="sm" trailing-icon="i-lucide-arrow-up-right">
                Discuss your project
              </UButton>
            </div>
          </div>

          <!-- CLOSE -->
          <UButton icon="i-lucide-x" color="neutral" variant="ghost" square size="xs" aria-label="Close"
            @click="dismissProjectCta" />
        </div>
      </div>
    </Transition>
  </article>
</template>

<style>
/*
|--------------------------------------------------------------------------
| Project Content
|--------------------------------------------------------------------------
*/

.project-content {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--ui-text-muted);
}

.project-content :deep(h2) {
  margin-top: 4rem;
  margin-bottom: 1.25rem;

  font-size: clamp(2rem,
      4vw,
      3.25rem);

  line-height: 1.05;
  letter-spacing: -0.04em;
  font-weight: 600;

  color: var(--ui-text-highlighted);
}

.project-content :deep(h3) {
  margin-top: 2.5rem;
  margin-bottom: 1rem;

  font-size: 1.5rem;
  font-weight: 600;

  color: var(--ui-text-highlighted);
}

.project-content :deep(p) {
  margin-bottom: 1.4rem;
}

.project-content :deep(ul) {
  margin: 1.5rem 0;

  padding-left: 1.25rem;

  list-style: disc;
}

.project-content :deep(li) {
  margin-top: 0.4rem;
}

.project-content :deep(strong) {
  color: var(--ui-text-highlighted);
}

.project-content :deep(a) {
  color: var(--ui-primary);

  text-decoration: underline;
  text-underline-offset: 4px;
}

/*
|--------------------------------------------------------------------------
| Floating CTA
|--------------------------------------------------------------------------
*/

.project-popup-enter-active,
.project-popup-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s cubic-bezier(0.22,
      1,
      0.36,
      1);
}

.project-popup-enter-from,
.project-popup-leave-to {
  opacity: 0;

  transform:
    translateY(24px) scale(0.96);
}

.project-popup-enter-to,
.project-popup-leave-from {
  opacity: 1;

  transform:
    translateY(0) scale(1);
}

/*
|--------------------------------------------------------------------------
| Mobile
|--------------------------------------------------------------------------
*/

@media (max-width: 640px) {

  .project-popup-enter-from,
  .project-popup-leave-to {
    transform:
      translateY(30px) scale(0.98);
  }
}

/*
|--------------------------------------------------------------------------
| Reduced Motion
|--------------------------------------------------------------------------
*/

@media (prefers-reduced-motion: reduce) {

  .project-popup-enter-active,
  .project-popup-leave-active {
    transition: none;
  }
}
</style>
