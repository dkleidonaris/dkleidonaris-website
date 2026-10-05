<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const hero = ref<HTMLElement | null>(null)
const statement = ref<HTMLElement | null>(null)
const projectsSection = ref<HTMLElement | null>(null)
const capabilities = ref<HTMLElement | null>(null)
const about = ref<HTMLElement | null>(null)
const contact = ref<HTMLElement | null>(null)

const { data: projects } = await useAsyncData(
  'featured-projects',
  () =>
    queryCollection('projects')
      .where('featured', '=', true)
      .order('order', 'ASC')
      .limit(3)
      .all()
)

useSeoMeta({
  title: 'Dimitris Kleidonaris — Developer & Electrical Engineer',
  description:
    'Developer and electrical engineer building custom web applications, digital platforms and intelligent systems.'
})

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const ctx = gsap.context(() => {
    // HERO
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out'
      }
    })

    tl.from('.hero-label', {
      y: 20,
      opacity: 0,
      duration: 0.7
    })
      .from(
        '.hero-title-line',
        {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.1
        },
        '-=0.4'
      )
      .from(
        '.hero-description',
        {
          y: 30,
          opacity: 0,
          duration: 0.8
        },
        '-=0.5'
      )
      .from(
        '.hero-actions',
        {
          y: 20,
          opacity: 0,
          duration: 0.7
        },
        '-=0.5'
      )

    // HERO PARALLAX
    gsap.to('.hero-content', {
      y: 120,
      opacity: 0.25,
      ease: 'none',

      scrollTrigger: {
        trigger: hero.value,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })

    // BIG STATEMENT
    gsap.from('.statement-line', {
      y: 80,
      opacity: 0,
      stagger: 0.12,
      ease: 'power3.out',

      scrollTrigger: {
        trigger: statement.value,
        start: 'top 75%',
        end: 'center 50%',
        scrub: 1
      }
    })

    // PROJECTS
    gsap.utils.toArray<HTMLElement>('.featured-project').forEach(project => {
      const visual = project.querySelector('.project-visual')
      const image = project.querySelector('.project-image')
      const content = project.querySelector('.project-content')

      gsap.from(visual, {
        y: 100,
        opacity: 0,
        scale: 0.96,
        duration: 1,

        scrollTrigger: {
          trigger: project,
          start: 'top 80%'
        }
      })

      gsap.from(content, {
        y: 60,
        opacity: 0,
        duration: 0.9,

        scrollTrigger: {
          trigger: project,
          start: 'top 72%'
        }
      })

      if (image) {
        gsap.fromTo(
          image,
          {
            yPercent: -5,
            scale: 1.08
          },
          {
            yPercent: 5,
            ease: 'none',

            scrollTrigger: {
              trigger: visual,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        )
      }
    })

    // CAPABILITIES
    gsap.from('.capability', {
      y: 50,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,

      scrollTrigger: {
        trigger: capabilities.value,
        start: 'top 75%'
      }
    })

    // ABOUT PHOTO MASK REVEAL
    gsap.from('.about-photo', {
      clipPath: 'inset(100% 0 0 0)',
      duration: 1.2,
      ease: 'power4.inOut',

      scrollTrigger: {
        trigger: about.value,
        start: 'top 70%'
      }
    })

    // ABOUT PHOTO ZOOM
    gsap.from('.about-photo-image', {
      scale: 1.15,
      duration: 1.5,
      ease: 'power3.out',

      scrollTrigger: {
        trigger: about.value,
        start: 'top 70%'
      }
    })

    // ABOUT TEXT
    gsap.from('.about-reveal', {
      y: 50,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',

      scrollTrigger: {
        trigger: about.value,
        start: 'top 65%'
      }
    })

    gsap.from('.brand-signature', {
      y: 40,
      opacity: 0,
      scale: 0.96,
      duration: 1,
      ease: 'power3.out',

      scrollTrigger: {
        trigger: '.brand-signature',
        start: 'top 85%'
      }
    })

    // CONTACT
    gsap.from('.contact-reveal', {
      y: 70,
      opacity: 0,
      stagger: 0.1,
      duration: 0.9,

      scrollTrigger: {
        trigger: contact.value,
        start: 'top 75%'
      }
    })
  })

  onUnmounted(() => {
    ctx.revert()
  })
})
</script>

<template>
  <div>
    <!-- HERO -->
    <section ref="hero" class="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
      <!-- subtle background grid -->
      <div class="pointer-events-none absolute inset-0 opacity-[0.04]" style="
          background-image:
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px);
          background-size: 64px 64px;
        " />

      <UContainer class="relative w-full">
        <div class="hero-content max-w-6xl py-32">
          <div class="hero-label mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
            <span class="size-2 rounded-full bg-primary" />

            Developer · Electrical Engineer · Builder
          </div>

          <h1 class="text-[clamp(4rem,10vw,9rem)] font-semibold leading-[0.84] tracking-[-0.075em]">
            <span class="block overflow-hidden">
              <span class="hero-title-line block">
                I build digital
              </span>
            </span>

            <span class="block overflow-hidden">
              <span class="hero-title-line block text-muted">
                things that work.
              </span>
            </span>
          </h1>

          <div class="mt-12 grid gap-10 md:grid-cols-[1fr_420px]">
            <div />

            <div>
              <p class="hero-description text-lg leading-8 text-muted md:text-xl">
                I design and develop custom digital systems —
                from web and mobile applications to APIs,
                AI-powered tools and technical infrastructure.
              </p>

              <div class="hero-actions mt-8 flex flex-wrap gap-3">
                <UButton to="#work" size="lg" trailing-icon="i-lucide-arrow-down">
                  Selected work
                </UButton>

                <UButton to="#contact" size="lg" color="neutral" variant="ghost">
                  Get in touch
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- STATEMENT -->
    <section ref="statement" class="flex min-h-[80vh] items-center py-32">
      <UContainer>
        <div class="max-w-6xl text-[clamp(2.8rem,7vw,7rem)] font-medium leading-[0.95] tracking-[-0.06em]">
          <div class="overflow-hidden">
            <div class="statement-line">
              Not just websites.
            </div>
          </div>

          <div class="overflow-hidden">
            <div class="statement-line text-muted">
              Systems built around
            </div>
          </div>

          <div class="overflow-hidden">
            <div class="statement-line text-muted">
              real problems.
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- SELECTED WORK -->
    <section id="work" ref="projectsSection" class="py-32 md:py-44">
      <UContainer>
        <div class="mb-24 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div class="mb-5 text-xs uppercase tracking-[0.3em] text-primary">
              Selected work
            </div>

            <h2 class="text-5xl font-semibold tracking-[-0.055em] md:text-7xl">
              Things I've built.
            </h2>
          </div>

          <UButton to="/projects" color="neutral" variant="ghost" trailing-icon="i-lucide-arrow-right">
            View all projects
          </UButton>
        </div>

        <div class="space-y-40">
          <article v-for="(project, index) in projects" :key="project.path"
            class="featured-project grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <!-- VISUAL -->
            <NuxtLink :to="project.path"
              class="project-visual group relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-default bg-elevated"
              :class="{
                'lg:order-2': index % 2 === 1
              }">
              <NuxtImg :src="project.cover" :alt="project.title" class="
    h-[115%] w-full
    object-cover object-top
    transition duration-700 ease-out
    group-hover:scale-[1.03]
  " />

              <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              <div
                class="absolute right-5 top-5 flex size-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                <UIcon name="i-lucide-arrow-up-right" class="size-5" />
              </div>

              <div
                class="absolute bottom-5 left-5 rounded-full bg-black/60 px-4 py-2 text-xs text-white backdrop-blur-md">
                0{{ index + 1 }}
              </div>
            </NuxtLink>

            <!-- CONTENT -->
            <div class="project-content" :class="{
              'lg:order-1': index % 2 === 1
            }">
              <div class="text-xs uppercase tracking-[0.25em] text-primary">
                0{{ index + 1 }} / {{ project.category }}
              </div>

              <h3 class="mt-5 text-5xl font-semibold tracking-[-0.055em] md:text-7xl">
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

              <UButton :to="project.path" class="mt-9" color="neutral" variant="link"
                trailing-icon="i-lucide-arrow-up-right">
                View case study
              </UButton>
            </div>
          </article>
        </div>
      </UContainer>
    </section>

    <!-- CAPABILITIES -->
    <section ref="capabilities" class="border-y border-default py-32 md:py-40">
      <UContainer>
        <div class="grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <div class="text-xs uppercase tracking-[0.3em] text-primary">
              Capabilities
            </div>

            <h2 class="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
              From idea to production.
            </h2>
          </div>

          <div class="divide-y divide-default">
            <div class="capability grid gap-4 py-8 md:grid-cols-[80px_1fr]">
              <span class="text-sm text-dimmed">
                01
              </span>

              <div>
                <h3 class="text-2xl font-medium">
                  Web Applications
                </h3>

                <p class="mt-3 max-w-xl leading-7 text-muted">
                  Custom platforms and applications built around
                  actual workflows, users and business requirements.
                </p>
              </div>
            </div>

            <div class="capability grid gap-4 py-8 md:grid-cols-[80px_1fr]">
              <span class="text-sm text-dimmed">
                02
              </span>

              <div>
                <h3 class="text-2xl font-medium">
                  APIs & Architecture
                </h3>

                <p class="mt-3 max-w-xl leading-7 text-muted">
                  Backend systems, REST APIs and decoupled
                  architectures designed to grow beyond a single interface.
                </p>
              </div>
            </div>

            <div class="capability grid gap-4 py-8 md:grid-cols-[80px_1fr]">
              <span class="text-sm text-dimmed">
                03
              </span>

              <div>
                <h3 class="text-2xl font-medium">
                  AI & Automation
                </h3>

                <p class="mt-3 max-w-xl leading-7 text-muted">
                  Intelligent tools and workflows that integrate AI
                  where it can solve a meaningful problem.
                </p>
              </div>
            </div>

            <div class="capability grid gap-4 py-8 md:grid-cols-[80px_1fr]">
              <span class="text-sm text-dimmed">
                04
              </span>

              <div>
                <h3 class="text-2xl font-medium">
                  Infrastructure
                </h3>

                <p class="mt-3 max-w-xl leading-7 text-muted">
                  Deployment, containerisation, cloud infrastructure
                  and the engineering required to keep applications running.
                </p>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ABOUT -->
    <section id="about" ref="about" class="py-32 md:py-44">
      <UContainer>
        <div class="mb-16">
          <div class="about-reveal text-xs uppercase tracking-[0.3em] text-primary">
            About / 04
          </div>
        </div>

        <div class="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <!-- PHOTO -->
          <div class="about-photo relative overflow-hidden rounded-[2rem]">
            <NuxtImg src="/images/me.webp" alt="Dimitris Kleidonaris"
              class="about-photo-image aspect-[4/5] w-full object-cover" />

            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <!-- TEXT -->
          <div class="lg:pt-12">
            <h2 class="about-reveal text-4xl font-medium leading-[1.08]
                 tracking-[-0.05em] md:text-6xl">
              I work where
              <span class="text-muted">software, engineering</span>
              and
              <span class="text-muted">problem solving</span>
              meet.
            </h2>

            <p class="about-reveal mt-10 max-w-2xl text-lg leading-8 text-muted">
              I'm Dimitris Kleidonaris, a developer and electrical
              engineering student focused on building custom digital
              systems that solve real problems.
            </p>

            <p class="about-reveal mt-5 max-w-2xl text-lg leading-8 text-muted">
              My work ranges from full-stack platforms and mobile-connected
              systems to APIs, infrastructure and experimental AI applications.
              I care about understanding the problem first — then choosing
              the technology that actually makes sense.
            </p>

            <div class="about-reveal mt-10 flex flex-wrap gap-3">
              <UButton href="https://github.com/dkleidonaris" target="_blank" color="neutral" variant="outline"
                icon="i-simple-icons-github">
                GitHub
              </UButton>

              <UButton href="https://www.linkedin.com/in/dkleidonaris" target="_blank" color="neutral" variant="ghost"
                icon="i-simple-icons-linkedin">
                LinkedIn
              </UButton>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- BRAND SIGNATURE -->
    <section class="py-24 md:py-36">
      <UContainer>
        <div class="flex justify-center">
          <NuxtImg src="/images/logo-full.webp" alt="KLEIDON — Dimitris Kleidonaris" class="
          brand-signature
          w-full
          max-w-[320px]
          md:max-w-[420px]
        " />
        </div>
      </UContainer>
    </section>

    <!-- CONTACT -->
    <section id="contact" ref="contact" class="border-t border-default py-32 md:py-44">
      <UContainer>
        <div class="max-w-5xl">
          <div class="contact-reveal text-xs uppercase tracking-[0.3em] text-primary">
            Have something in mind?
          </div>

          <h2 class="contact-reveal mt-7 text-[clamp(3.5rem,8vw,8rem)] font-semibold leading-[0.9] tracking-[-0.07em]">
            Let's build
            <span class="text-muted">something useful.</span>
          </h2>

          <div class="contact-reveal mt-12">
            <UButton href="mailto:d@dkleidonaris.com" size="xl" trailing-icon="i-lucide-arrow-up-right">
              Start a conversation
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
