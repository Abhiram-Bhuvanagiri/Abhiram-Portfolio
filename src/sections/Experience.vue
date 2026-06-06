<template>
  <section
    id="experience"
    ref="experienceSection"
    class="experience-section relative px-5 lg:px-28 py-24 lg:py-32"
    :class="isJa ? 'is-ja' : ''"
  >
    <div class="mx-auto w-full max-w-5xl">
      <!-- Title Header -->
      <div class="relative mb-16 text-center">
        <span ref="expBg" class="experience-bg-text">{{ t('nav.experience') }}</span>
        <h2 ref="expTitle" class="experience-title">{{ t('experience.title') }}</h2>
        <p ref="expSubtitle" class="experience-subtitle-text mt-3 text-[color:var(--theme-text-muted)] text-sm md:text-base font-medium tracking-wide">
          {{ t('experience.subtitle') }}
        </p>
      </div>

      <!-- Experience Grid -->
      <div ref="expGrid" class="grid gap-10 md:grid-cols-2 mt-20 text-left">
        <!-- Work Experience Column -->
        <div class="flex flex-col gap-6">
          <h3 class="column-title text-xl font-bold flex items-center gap-3 text-[color:var(--theme-text-strong)]">
            <i class="bi bi-briefcase text-lg text-[color:var(--theme-headline-from)]"></i>
            {{ t('experience.internshipTitle') }}
          </h3>

          <div
            v-for="(job, index) in jobs"
            :key="index"
            class="experience-card p-6 md:p-8 rounded-2xl bg-[color:var(--theme-pill-bg)] border border-[color:var(--theme-pill-border)] shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 relative group"
          >
            <div class="flex justify-between items-start flex-wrap gap-2 mb-4">
              <div>
                <h4 class="font-bold text-lg text-[color:var(--theme-text-strong)]">{{ job.role }}</h4>
                <p class="text-sm font-semibold text-[color:var(--theme-headline-from)] mt-0.5">{{ job.company }}</p>
              </div>
              <span class="text-xs font-semibold px-3 py-1 bg-[color:var(--theme-line-soft)] text-[color:var(--theme-text-soft)] rounded-full">{{ job.period }}</span>
            </div>
            
            <ul class="space-y-3 mt-4 text-[color:var(--theme-text-muted)] text-sm leading-relaxed">
              <li v-for="(bullet, bIndex) in job.bullets" :key="bIndex" class="flex items-start gap-2.5">
                <span class="w-1.5 h-1.5 bg-[color:var(--theme-headline-from)] rounded-full mt-2 shrink-0"></span>
                <span>{{ bullet }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Education & Certifications Column -->
        <div class="flex flex-col gap-8">
          <!-- Education Sub-column -->
          <div class="flex flex-col gap-6">
            <h3 class="column-title text-xl font-bold flex items-center gap-3 text-[color:var(--theme-text-strong)]">
              <i class="bi bi-mortarboard text-lg text-[color:var(--theme-headline-from)]"></i>
              {{ t('experience.educationTitle') }}
            </h3>

            <div
              v-for="(edu, index) in education"
              :key="index"
              class="experience-card p-6 md:p-8 rounded-2xl bg-[color:var(--theme-pill-bg)] border border-[color:var(--theme-pill-border)] shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 relative group"
            >
              <div class="flex justify-between items-start flex-wrap gap-2 mb-3">
                <div>
                  <h4 class="font-bold text-base md:text-lg text-[color:var(--theme-text-strong)]">{{ edu.degree }}</h4>
                  <p class="text-sm font-semibold text-[color:var(--theme-headline-from)] mt-0.5">{{ edu.school }}</p>
                </div>
                <span class="text-xs font-semibold px-3 py-1 bg-[color:var(--theme-line-soft)] text-[color:var(--theme-text-soft)] rounded-full">{{ edu.period }}</span>
              </div>
              <p class="text-sm font-medium text-[color:var(--theme-text-strong)]">{{ edu.grade }}</p>
              <p class="text-xs text-[color:var(--theme-text-muted)] mt-2 leading-relaxed">{{ edu.coursework }}</p>
            </div>
          </div>

          <!-- Certifications Sub-column -->
          <div class="flex flex-col gap-6">
            <h3 class="column-title text-xl font-bold flex items-center gap-3 text-[color:var(--theme-text-strong)]">
              <i class="bi bi-patch-check text-lg text-[color:var(--theme-headline-from)]"></i>
              {{ t('experience.certificationsTitle') }}
            </h3>

            <div class="experience-card p-6 md:p-8 rounded-2xl bg-[color:var(--theme-pill-bg)] border border-[color:var(--theme-pill-border)] shadow-sm relative">
              <ul class="space-y-4 text-[color:var(--theme-text-muted)] text-sm leading-relaxed">
                <li v-for="(cert, index) in certifications" :key="index" class="flex items-start gap-2.5">
                  <i class="bi bi-check2-circle text-[color:var(--theme-headline-from)] text-base shrink-0"></i>
                  <span>{{ cert }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, tm, locale } = useI18n();
const isJa = computed(() => locale.value === 'ja');

const fallbackJobs = [
  {
    role: "Gen AI Engineer Intern",
    company: "SyncAI",
    period: "Nov 2025 - Apr 2026",
    bullets: [
      "Built and deployed LLM-powered applications using LangChain and Hugging Face Transformers.",
      "Implemented RAG pipelines with vector databases to improve contextual response accuracy.",
      "Designed prompt engineering workflows for optimized AI-generated outputs.",
      "Integrated AI functionalities into full-stack applications using FastAPI and React.",
      "Improved inference efficiency and reduced latency through optimized API handling."
    ]
  }
];

const fallbackEducation = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    school: "VITS Engineering College",
    period: "Nov 2022 - May 2026",
    grade: "Cumulative GPA: 7.0 / 10.0",
    coursework: "Relevant Coursework: Python, JavaScript, Tailwind CSS, Data Structures and Algorithms"
  }
];

const fallbackCertifications = [
  "Full Stack Web Development — The Odin Project, freeCodeCamp",
  "Generative AI with Large Language Models — DeepLearning.AI & AWS"
];

const jobs = computed(() => {
  const jobsData = tm('experience.jobs');
  if (Array.isArray(jobsData) && jobsData.length > 0) return jobsData;
  return fallbackJobs;
});

const education = computed(() => {
  const eduData = tm('experience.education');
  if (Array.isArray(eduData) && eduData.length > 0) return eduData;
  return fallbackEducation;
});

const certifications = computed(() => {
  const certData = tm('experience.certifications');
  if (Array.isArray(certData) && certData.length > 0) return certData;
  return fallbackCertifications;
});

const experienceSection = ref(null);
const expTitle = ref(null);
const expSubtitle = ref(null);
const expBg = ref(null);
const expGrid = ref(null);

let expTimeline = null;

onMounted(async () => {
  const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]);
  gsap.registerPlugin(ScrollTrigger);

  const sectionEl = experienceSection.value;
  const titleEl = expTitle.value;
  const subtitleEl = expSubtitle.value;
  const bgEl = expBg.value;
  const gridEl = expGrid.value;

  if (!sectionEl || !titleEl || !bgEl || !gridEl) return;

  // Use simpler animations on mobile to prevent GPU thrashing / flickering
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const blurFrom = isMobile ? '0px' : '6px';

  gsap.set([titleEl, bgEl, subtitleEl], {
    opacity: 0,
    y: 28,
    filter: `blur(${blurFrom})`
  });

  gsap.set(gridEl.children, {
    opacity: 0,
    y: isMobile ? 20 : 40
  });

  expTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: sectionEl,
      start: 'top 55%',
      toggleActions: 'play none none none'
    }
  });

  expTimeline
    .to(bgEl, {
      opacity: 0.08,
      y: 0,
      filter: isMobile ? 'blur(0px)' : 'blur(10px)',
      duration: 1.1,
      ease: 'power3.out'
    })
    .to(titleEl, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.9,
      ease: 'power3.out'
    }, 0.15)
    .to(subtitleEl, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    }, 0.3)
    .to(gridEl.children, {
      opacity: 1,
      y: 0,
      duration: isMobile ? 0.6 : 1.0,
      ease: 'power3.out',
      stagger: 0.2
    }, 0.4);
});

onUnmounted(() => {
  if (expTimeline) {
    if (expTimeline.scrollTrigger) expTimeline.scrollTrigger.kill();
    expTimeline.kill();
    expTimeline = null;
  }
});
</script>

<style scoped>
.experience-bg-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: clamp(3rem, 13vw, 8.5rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--theme-text-strong);
  opacity: 0.02;
  pointer-events: none;
  white-space: nowrap;
  user-select: none;
  filter: blur(10px);
  line-height: 1;
}

.experience-title {
  position: relative;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: var(--theme-text-strong);
  z-index: 1;
}

.experience-card {
  transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.experience-card:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--theme-headline-from) 25%, var(--theme-pill-border) 75%);
}

:deep([data-theme="dark"]) .experience-card {
  background: rgba(30, 35, 45, 0.8);
  border-color: rgba(255, 255, 255, 0.1);
}

:deep([data-theme="dark"]) .experience-card:hover {
  background: rgba(40, 45, 55, 0.9);
}

:deep([data-theme="dark"]) .experience-bg-text {
  opacity: 0.04;
}

:deep([data-theme="light"]) .experience-card {
  background: rgba(255, 255, 255, 0.65);
  border-color: rgba(0, 0, 0, 0.08);
}

:deep([data-theme="light"]) .experience-card:hover {
  background: rgba(255, 255, 255, 0.85);
}

:deep([data-theme="light"]) .experience-bg-text {
  opacity: 0.05;
}

.experience-section.is-ja .experience-bg-text {
  text-transform: none;
  letter-spacing: 0.04em;
  font-size: clamp(3rem, 14vw, 8.5rem);
}

@media (max-width: 1024px) {
  .experience-bg-text {
    opacity: 0.6;
    filter: blur(5px) !important;
  }

  :deep([data-theme="dark"]) .experience-bg-text {
    opacity: 0.66;
  }

  :deep([data-theme="light"]) .experience-bg-text {
    opacity: 0.7;
  }
}
</style>
