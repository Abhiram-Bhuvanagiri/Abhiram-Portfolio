<template>
  <main class="project-detail-page">
    <button class="project-back" type="button" @click="goBack">
      <span class="project-back-icon">←</span>
      <span>{{ t("projectDetail.back") }}</span>
    </button>

    <section class="project-detail-wrapper">
      <header class="project-header">
        <span class="project-status" v-if="projectStatus">{{ projectStatus }}</span>
        <h1 class="project-title">{{ projectTitle }}</h1>
        <div class="project-links-meta mt-2 flex flex-wrap gap-4 text-sm" v-if="projectGitHub || projectLive || projectTechs.length">
          <a v-if="projectGitHub" :href="projectGitHub" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 hover:text-[color:var(--theme-headline-from)] transition-colors duration-200">
            <i class="bi bi-github"></i>
            <span>{{ t("projectDetail.githubLabel") }}</span>
          </a>
          <a v-if="projectLive" :href="projectLive" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 hover:text-[color:var(--theme-headline-from)] transition-colors duration-200">
            <i class="bi bi-box-arrow-up-right"></i>
            <span>{{ t("projectDetail.liveLabel") }}</span>
          </a>
          <span v-if="(projectGitHub || projectLive) && projectTechs.length" class="text-[color:var(--theme-text-muted)]">|</span>
          <div v-if="projectTechs.length" class="flex items-center gap-1.5 text-[color:var(--theme-text-muted)] flex-wrap">
            <span class="font-semibold text-[color:var(--theme-text-soft)]">{{ t("projectDetail.techStackLabel") }}:</span>
            <span>{{ projectTechs.join(', ') }}</span>
          </div>
        </div>
      </header>

      <div class="project-content mt-8">
        <article class="project-section" v-if="overviewSection && overviewSection.title">
          <h2>{{ overviewSection.title }}</h2>
          <p v-for="(p, index) in getParagraphs(overviewSection)" :key="index">{{ p }}</p>
        </article>

        <article class="project-section" v-if="coreIdeaSection && coreIdeaSection.title">
          <h2>{{ coreIdeaSection.title }}</h2>
          <p v-for="(p, index) in getParagraphs(coreIdeaSection)" :key="index">{{ p }}</p>
        </article>
      </div>
    </section>
  </main>
  <Footer />
</template>

<script setup>
import { computed, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import Footer from "@/components/Footer.vue";

const { t, tm } = useI18n();
const router = useRouter();
const route = useRoute();
const startPageTransition = inject("startPageTransition", null);

const projectId = computed(() => route.params.id || "stock-market-app");

// Project specific metadata that doesn't need to be localized
const projectMeta = {
  "stock-market-app": {
    github: "https://github.com/Abhiram-Bhuvanagiri/stock-market-app",
    live: "https://stock-market-app-six.vercel.app",
    techs: ["Next.js", "Inngest", "MongoDB", "Better Auth", "Node Mailer"]
  },
  "voice-interview-simulation": {
    github: "https://github.com/Abhiram-Bhuvanagiri/ai-mock-interviews",
    live: "https://ai-mock-interviews-opal-six.vercel.app/",
    techs: ["Next.js", "Vapi", "Firebase", "Tailwind CSS"]
  },
  "job-application-bot": {
    github: "https://github.com/Abhiram-Bhuvanagiri",
    techs: ["n8n", "LinkedIn API", "Slack API", "Node.js"]
  }
};

const projectTitle = computed(() => t(`projectDetail.${projectId.value}.title`));
const projectStatus = computed(() => t(`projectDetail.${projectId.value}.status`));
const projectGitHub = computed(() => projectMeta[projectId.value]?.github || "");
const projectLive = computed(() => projectMeta[projectId.value]?.live || "");
const projectTechs = computed(() => projectMeta[projectId.value]?.techs || []);

const overviewSection = computed(() => tm(`projectDetail.${projectId.value}.sections.overview`));
const coreIdeaSection = computed(() => tm(`projectDetail.${projectId.value}.sections.coreIdea`));

const getParagraphs = (sectionObj) => {
  if (!sectionObj || typeof sectionObj !== "object") return [];
  return Object.keys(sectionObj)
    .filter(k => k.startsWith('p'))
    .sort()
    .map(k => sectionObj[k]);
};

const goBack = () => {
  const navigate = () => {
    router.push({ name: "home", query: { section: "projects-anchor" } });
  };
  if (startPageTransition) {
    startPageTransition(navigate);
  } else {
    navigate();
  }
};
</script>

<style scoped>
.project-detail-page {
  min-height: 100vh;
  padding: clamp(6rem, 10vw, 8rem) clamp(1.25rem, 5vw, 4.5rem) clamp(3rem, 8vw, 6rem);
  color: var(--theme-text-strong);
  position: relative;
}

.project-detail-wrapper {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.project-back {
  position: absolute;
  top: 1.25rem;
  left: clamp(1.5rem, 5vw, 4rem);
  z-index: 101;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--theme-text-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease, transform 0.2s ease;
}

.project-back:hover {
  color: var(--theme-text-strong);
  transform: translateX(-4px);
}

.project-back-icon {
  font-size: 1.1rem;
}

/* Header */
.project-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.project-status {
  display: inline-block;
  width: fit-content;
  padding: 0.4rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--theme-cta-text);
  background: var(--theme-cta-bg);
  border-radius: 2rem;
}

.project-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin: 0;
}

/* Content sections */
.project-content {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.project-section h2 {
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--theme-text-strong);
}

.project-section p {
  margin: 0 0 0.75rem 0;
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--theme-text-muted);
}

.project-section p:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .project-detail-page {
    padding-top: 5rem;
  }

  .project-back {
    font-size: 0.8rem;
  }

  .project-section p {
    font-size: 1rem;
  }
}
</style>
