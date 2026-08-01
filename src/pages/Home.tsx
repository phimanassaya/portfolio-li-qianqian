import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  FolderKanban,
  Gem,
  Github,
  Languages,
  Mail,
  Target,
  type LucideIcon
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import LinkButton from '../components/ui/LinkButton';
import SectionTitle from '../components/ui/SectionTitle';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { getProfileImageUrl, getResumeUrl } from '../services/storage.service';
import { client } from '../data/client';
import { pickText, pickList } from '../utils/localize';

const statisticIcons: LucideIcon[] = [FolderKanban, Languages, Target];

function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  useDocumentTitle(client.personal.fullName);
  const roles = pickList(client.personal.roles, i18n.language);
  const statistics = client.about.statistics;
  const featuredProjects = client.projects.filter((project) => project.featured);
  const aboutPreviewCards = client.about.previewHighlights;
  const viewDetailsButton = t('home.featuredProjects.viewDetailsButton');

  const { firstName, lastName } = client.personal;

  const profileSrc = getProfileImageUrl() ?? client.assets.profileImage;
  const resumeHref = getResumeUrl() ?? client.documents.resume;

  return (
    <div className="space-y-24">
      {/* HERO */}
      <section aria-labelledby="hero-heading" className="relative">
        <div className="relative grid gap-14 xl:grid-cols-[1.15fr_1fr] xl:items-center xl:gap-16">
          <motion.div className="min-w-0" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-heading text-lg italic text-primary">{t('home.greeting')}</p>

            <h1
              id="hero-heading"
              className="mt-4 break-words font-heading text-4xl font-extrabold uppercase leading-[0.98] tracking-tight text-heading sm:text-5xl md:text-6xl xl:text-4xl 2xl:text-6xl"
            >
              <span className="block">{firstName}</span>
              <span className="block bg-gradient-to-r from-primary-600 via-primary to-primary-300 bg-clip-text text-transparent">
                {lastName}
              </span>
            </h1>

            <ul
              className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium uppercase tracking-[0.2em] text-body"
              aria-label={t('home.rolesLabel')}
            >
              {roles.map((role, index) => (
                <li key={role} className="flex items-center gap-4">
                  {index > 0 ? <span className="h-3 w-px bg-border" aria-hidden="true" /> : null}
                  {role}
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-xl text-lg leading-8 text-body">{pickText(client.personal.bio, i18n.language)}</p>

            <div className="mt-10 flex flex-wrap gap-4">
              <LinkButton href={resumeHref} variant="primary" aria-label={t('home.buttons.downloadResume')}>
                <Download className="h-4 w-4" aria-hidden="true" />
                {t('home.buttons.downloadResume')}
              </LinkButton>
              <LinkButton to="/contact" variant="secondary">
                {t('home.buttons.contactMe')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </LinkButton>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton
                href={client.social.github}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                aria-label={t('home.social.github')}
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                {t('home.social.github')}
              </LinkButton>
              <LinkButton href={`mailto:${client.contact.email}`} variant="outline" aria-label={t('home.social.email')}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                {t('home.social.email')}
              </LinkButton>
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-sm xl:max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-lift">
              <img
                src={profileSrc}
                alt={t('home.profile.alt')}
                className="h-full w-full object-cover object-top"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = client.assets.profileImage;
                }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-4 h-10 w-10 border-l border-t border-primary"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-4 right-4 h-10 w-10 border-b border-r border-primary"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute -left-6 -top-6 flex h-16 w-16 items-center justify-center rounded-full border border-primary bg-background shadow-soft sm:-left-8 sm:-top-8 sm:h-20 sm:w-20"
            >
              <Gem className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <div className="relative mt-8 max-w-xs">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">{t('home.profile.alt')}</p>
              <p className="mt-2 text-sm leading-6 text-secondary">
                {pickText(client.assets.profileImageCaption, i18n.language)}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="editorial-index space-y-24">
        {/* KEY STATISTICS */}
        <section aria-labelledby="statistics-heading" className="pb-4">
          <SectionTitle
            id="statistics-heading"
            title={t('home.statistics.heading')}
            description={t('home.statistics.description')}
          />
          <Card>
            <motion.div
              className="grid gap-8 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {statistics.map((item, index) => {
                const Icon = statisticIcons[index] ?? Target;
                return (
                  <div key={item.label.en} className="flex items-start gap-4 pt-6 first:pt-0 sm:px-8 sm:pt-0 sm:first:pl-0 sm:last:pr-0">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                        {pickText(item.label, i18n.language)}
                      </p>
                      <p className="mt-2 bg-gradient-to-r from-primary-600 via-primary to-primary-300 bg-clip-text font-heading text-3xl font-bold text-transparent sm:text-4xl">
                        {pickText(item.value, i18n.language)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </Card>
        </section>

        {/* FEATURED PROJECTS */}
        <section aria-labelledby="featured-projects-heading" className="pb-4">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle
              id="featured-projects-heading"
              title={t('home.featuredProjects.heading')}
              description={t('home.featuredProjects.description')}
            />
            <LinkButton to="/projects" variant="ghost" size="sm">
              {t('nav.projects')}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </LinkButton>
          </div>
          <motion.div
            className="grid gap-8 lg:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {featuredProjects.map((project) => {
              const projectTitle = pickText(project.title, i18n.language);
              return (
              <Card key={project.id} className="group space-y-6 overflow-hidden">
                <div className="-mx-8 -mt-8 aspect-[16/9] overflow-hidden rounded-t-2xl border-b border-border sm:-mx-10 sm:-mt-10">
                  <img
                    src={project.image}
                    alt={projectTitle}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">{project.tagline}</p>
                  <h3 className="mt-3 font-heading text-2xl font-bold text-heading">{projectTitle}</h3>
                </div>
                <ul className="space-y-3 text-sm leading-6 text-body">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-border pt-4 text-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                    {t('home.featuredProjects.techStack')}
                  </p>
                  <p className="mt-2 text-body">{project.techStackSummary.join(', ')}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-0"
                  aria-label={`${viewDetailsButton}: ${projectTitle}`}
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  {viewDetailsButton}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Button>
              </Card>
              );
            })}
          </motion.div>
        </section>

        {/* ABOUT PREVIEW */}
        <section aria-labelledby="about-preview-heading" className="pb-4">
          <SectionTitle
            id="about-preview-heading"
            title={t('home.aboutPreview.heading')}
            description={pickText(client.about.preview, i18n.language)}
          />
          <motion.div
            className="grid gap-8 md:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {aboutPreviewCards.map((card) => (
              <Card key={card.title.en} className="space-y-4">
                <span className="block h-px w-10 bg-primary" aria-hidden="true" />
                <h3 className="font-heading text-xl font-bold text-heading">{pickText(card.title, i18n.language)}</h3>
                <p className="text-sm leading-6 text-body">{card.description}</p>
              </Card>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}

export default Home;
