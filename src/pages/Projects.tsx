import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Github } from 'lucide-react';
import Button from '../components/ui/Button';
import LinkButton from '../components/ui/LinkButton';
import Badge from '../components/ui/Badge';
import SectionTitle from '../components/ui/SectionTitle';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { client } from '../data/client';
import { pickText } from '../utils/localize';

function Projects() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  useDocumentTitle(`${t('nav.projects')} | ${client.personal.fullName}`);
  const viewDetailsButton = t('projects.viewDetailsButton');
  const projectEntries = client.projects;

  return (
    <div className="editorial-index space-y-16">
      <h1 className="sr-only">{t('nav.projects')}</h1>
      <section aria-labelledby="projects-heading" className="pb-16">
        <SectionTitle id="projects-heading" title={t('projects.heading')} description={t('projects.description')} />
        <div className="space-y-28">
          {projectEntries.map((project, index) => {
            const gallery = project.image ? [project.image] : [];
            const projectTitle = pickText(project.title, i18n.language);
            return (
              <motion.div
                key={project.id}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="bleed-full-mobile grid grid-cols-2 gap-2">
                  {gallery[0] ? (
                    <div className="relative col-span-2 aspect-[16/9] w-full overflow-hidden border border-border bg-surface">
                      <img src={gallery[0]} alt={project.imageAlt} loading="lazy" className="h-full w-full object-cover" />
                    </div>
                  ) : null}
                  {gallery.slice(1).map((src) => (
                    <div key={src} className="relative aspect-[4/3] w-full overflow-hidden border border-border bg-surface">
                      <img src={src} alt={project.imageAlt} loading="lazy" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <p className="font-heading text-4xl font-extrabold text-primary">{`0${index + 1}`}</p>
                  <div>
                    <h3 className="font-heading text-3xl font-bold text-heading sm:text-4xl">{projectTitle}</h3>
                    <p className="mt-4 text-base leading-7 text-body">{pickText(project.description, i18n.language)}</p>
                  </div>

                  <div className="border-t border-border pt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                      {t('projects.techStackLabel')}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label={t('projects.techStackLabel')}>
                      {project.techStackSummary.map((tech) => (
                        <li key={tech}>
                          <Badge label={tech} variant="secondary" />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center">
                    <Button
                      variant="primary"
                      aria-label={`${viewDetailsButton}: ${projectTitle}`}
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      {viewDetailsButton}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                    <LinkButton
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      aria-label={`${t('projects.githubLabel')}: ${projectTitle}`}
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      {t('projects.githubLabel')}
                    </LinkButton>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Projects;
