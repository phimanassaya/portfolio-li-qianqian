import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Badge from '../components/ui/Badge';
import SectionTitle from '../components/ui/SectionTitle';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { client } from '../data/client';
import { pickText, pickList } from '../utils/localize';

function Experience() {
  const { t, i18n } = useTranslation();
  useDocumentTitle(`${t('nav.experience')} | ${client.personal.fullName}`);

  const workExperienceItems = client.experience.map((role) => {
    const startDate = pickText(role.startDate, i18n.language);
    const endDate = role.current ? t('experience.workExperience.present') : role.endDate;
    return {
      ...role,
      position: pickText(role.position, i18n.language),
      responsibilities: pickList(role.responsibilities, i18n.language),
      timeframe: `${startDate} – ${endDate}`
    };
  });
  const educationItems = client.education;
  const certificationItems = client.skills.certifications;
  const timelineItems = client.timeline;

  return (
    <div className="editorial-index space-y-28">
      <h1 className="sr-only">{t('nav.experience')}</h1>

      <section aria-labelledby="work-experience-heading" className="pb-4">
        <SectionTitle
          id="work-experience-heading"
          title={t('experience.workExperience.heading')}
          description={t('experience.description')}
        />
        <motion.div
          className="space-y-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {workExperienceItems.map((role, index) => (
            <div key={`${role.company}-${index}`} className="border-l-2 border-primary pl-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-heading sm:text-3xl">{role.position}</h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">{role.company}</p>
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">{role.timeframe}</p>
              </div>
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {role.responsibilities.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-body">
                    <span className="mt-2.5 h-1 w-1 shrink-0 bg-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </section>

      <section aria-labelledby="education-heading" className="pb-4">
        <SectionTitle id="education-heading" title={t('experience.education.heading')} />
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {educationItems.map((edu) => (
            <div key={edu.school} className="border-l-2 border-border pl-6">
              <h3 className="font-heading text-2xl font-bold text-heading sm:text-3xl">{edu.school}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                {pickText(edu.degree, i18n.language)}
              </p>
              <p className="mt-2 text-sm leading-6 text-body">{pickText(edu.field, i18n.language)}</p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-secondary">
                <span>
                  {t('experience.education.graduatedLabel')}: {pickText(edu.endDate, i18n.language)}
                </span>
                <span>{t('experience.education.gpaLabel')}: {edu.gpa}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      <section aria-labelledby="certifications-heading" className="pb-4">
        <SectionTitle id="certifications-heading" title={t('experience.certifications.heading')} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
          <ul className="flex flex-wrap gap-3" aria-label={t('experience.certifications.heading')}>
            {certificationItems.map((cert) => (
              <li key={cert}>
                <Badge label={cert} />
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      <section aria-labelledby="timeline-heading" className="pb-4">
        <SectionTitle id="timeline-heading" title={t('experience.timeline.heading')} />
        <motion.ol
          className="relative space-y-8 border-l border-border pl-8"
          aria-label={t('experience.timeline.heading')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {timelineItems.map((entry) => (
            <li key={entry.period.en} className="relative">
              <span
                className="absolute -left-[2.15rem] top-1 h-3 w-3 border-2 border-background bg-primary"
                aria-hidden="true"
              />
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                {pickText(entry.period, i18n.language)}
              </p>
              <ul className="mt-3 space-y-1.5">
                {pickList(entry.points, i18n.language).map((point) => (
                  <li key={point} className="text-base leading-7 text-body">
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </motion.ol>
      </section>
    </div>
  );
}

export default Experience;
