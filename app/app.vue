<script setup lang="ts">
const route = useRoute()

const activeSection = ref('home')

const sectionIds = [
  'home',
  'projects',
  'about',
  'contact'
]

const navItems = [
  {
    label: 'Home',
    to: '/',
    section: 'home'
  },
  {
    label: 'Projects',
    to: '/projects',
    section: 'projects'
  },
  {
    label: 'About',
    to: '/#about',
    section: 'about'
  },
  {
    label: 'Contact',
    to: '/#contact',
    section: 'contact'
  }
]

const isActive = (section: string) => {
  if (section === 'projects') {
    return (
      route.path.startsWith('/projects') ||
      (
        route.path === '/' &&
        activeSection.value === 'projects'
      )
    )
  }

  if (route.path !== '/') {
    return false
  }

  return activeSection.value === section
}

const updateActiveSection = () => {
  if (route.path !== '/') {
    return
  }

  const marker =
    window.scrollY +
    window.innerHeight * 0.35

  let current = 'home'

  for (const id of sectionIds) {
    const section = document.getElementById(id)

    if (!section) continue

    if (section.offsetTop <= marker) {
      current = id
    }
  }

  activeSection.value = current
}

const scrollToSection = async (section: string) => {
  if (route.path !== '/') {
    await navigateTo(`/#${section}`)

    await nextTick()

    setTimeout(() => {
      document
        .getElementById(section)
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
    }, 50)

    return
  }

  document
    .getElementById(section)
    ?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
}

onMounted(() => {
  updateActiveSection()

  window.addEventListener(
    'scroll',
    updateActiveSection,
    { passive: true }
  )

  window.addEventListener(
    'resize',
    updateActiveSection,
    { passive: true }
  )
})

watch(
  () => route.path,
  async () => {
    await nextTick()

    setTimeout(() => {
      updateActiveSection()
    }, 50)
  }
)

onUnmounted(() => {
  window.removeEventListener(
    'scroll',
    updateActiveSection
  )

  window.removeEventListener(
    'resize',
    updateActiveSection
  )
})
</script>

<template>
  <UApp>
    <div class="min-h-screen bg-default text-highlighted">

      <!-- HEADER -->
      <UHeader class="
          fixed inset-x-0 top-0 z-50
          border-b border-default/60
          bg-default/75
          backdrop-blur-xl
        ">
        <!-- LOGO -->
        <template #title>
          <NuxtLink to="/" class="inline-flex items-center">
            <img src="/images/logo-letters.webp" alt="Dimitris Kleidonaris" class="h-8 w-auto">
          </NuxtLink>
        </template>

        <!-- DESKTOP NAV -->
        <nav class="hidden items-center gap-7 md:flex">
          <NuxtLink to="/" class="nav-link" :class="{
            'nav-link-active': isActive('home')
          }">
            Home
          </NuxtLink>

          <NuxtLink to="/projects" class="nav-link" :class="{
            'nav-link-active': isActive('projects')
          }">
            Projects
          </NuxtLink>

          <button type="button" class="nav-link" :class="{
            'nav-link-active': isActive('about')
          }" @click="scrollToSection('about')">
            About
          </button>

          <button type="button" class="nav-link" :class="{
            'nav-link-active': isActive('contact')
          }" @click="scrollToSection('contact')">
            Contact
          </button>
        </nav>

        <!-- RIGHT SIDE -->
        <template #right>
          <div class="flex items-center gap-1">
            <UButton to="https://github.com/dkleidonaris" target="_blank" icon="i-simple-icons-github" color="neutral"
              variant="ghost" square aria-label="GitHub" />

            <UColorModeButton />
          </div>
        </template>

        <!-- MOBILE MENU -->
        <template #body>
          <UNavigationMenu :items="navItems" orientation="vertical" class="w-full" />
        </template>
      </UHeader>

      <!-- MAIN -->
      <UMain>
        <NuxtPage />
      </UMain>

      <!-- FOOTER -->
      <footer class="border-t border-default">
        <UContainer class="
            flex flex-col gap-8 py-10
            md:flex-row
            md:items-center
            md:justify-between
          ">
          <div>
            <img src="/images/logo-letters.webp" alt="Dimitris Kleidonaris" class="h-6 w-auto">

            <p class="mt-3 text-sm text-muted">
              Digital systems, engineered.
            </p>
          </div>

          <div class="
              flex flex-wrap items-center
              gap-x-6 gap-y-3
              text-sm text-muted
            ">
            <NuxtLink to="/projects" class="
                transition-colors
                hover:text-highlighted
              ">
              Projects
            </NuxtLink>

            <a href="https://github.com/dkleidonaris" target="_blank" rel="noopener noreferrer" class="
                transition-colors
                hover:text-highlighted
              ">
              GitHub
            </a>

            <a href="#" target="_blank" rel="noopener noreferrer" class="
                transition-colors
                hover:text-highlighted
              ">
              LinkedIn
            </a>
          </div>

          <div class="text-sm text-dimmed">
            © {{ new Date().getFullYear() }}
          </div>
        </UContainer>
      </footer>
    </div>
  </UApp>
</template>

<style>
html {
  scroll-behavior: smooth;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
}

::selection {
  background: color-mix(in srgb,
      var(--ui-primary) 25%,
      transparent);
}

/* PAGE TRANSITIONS */

.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* NAVIGATION */

.nav-link {
  position: relative;

  padding: 0;

  border: 0;
  background: transparent;

  cursor: pointer;

  font-size: 0.875rem;
  font-weight: 500;
  font-family: inherit;

  color: var(--ui-text-muted);

  transition:
    color 0.25s ease;
}

.nav-link:hover {
  color: var(--ui-text-highlighted);
}

.nav-link::after {
  content: '';

  position: absolute;

  left: 0;
  right: 100%;
  bottom: -8px;

  height: 1px;

  background: var(--ui-primary);

  transition:
    right 0.3s ease;
}

.nav-link:hover::after,
.nav-link-active::after {
  right: 0;
}

.nav-link-active {
  color: var(--ui-text-highlighted);
}

/* Make anchors account for fixed header */

#home,
#projects,
#about,
#contact {
  scroll-margin-top: 90px;
}

/* REDUCED MOTION */

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .page-enter-active,
  .page-leave-active {
    transition: none;
  }
}
</style>
