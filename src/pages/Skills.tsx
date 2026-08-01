import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Card from '../components/ui/Card';
import SectionTitle from '../components/ui/SectionTitle';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { client } from '../data/client';
import { pickText, pickList } from '../utils/localize';

interface SkillGroup {
  heading: string;
  items: string[];
}

function SkillGroupList({ heading, items }: SkillGroup) {
  return (
    <div>
      <h3 className="font-heading text-lg font-bold uppercase tracking-[0.1em] text-heading">{heading}</h3>
      <div className="mt-4 h-px w-12 bg-primary" aria-hidden="true" />
      <ul className="mt-6 space-y-3" aria-label={heading}>
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm leading-6 text-body">
            <span className="h-1 w-1 shrink-0 bg-primary" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Skills() {
  const { t, i18n } = useTranslation();
  useDocumentTitle(`${t('nav.skills')} | ${client.personal.fullName}`);

  const technicalSkills = client.skills.technical;
  const businessSkills = client.skills.strengths;
  const officeProductivity = client.skills.software;
  const languages = client.skills.languages;
  const learningJourney = pickList(client.skills.learning, i18n.language);

  return (
    <div className="editorial-index space-y-28">
      <h1 className="sr-only">{t('nav.skills')}</h1>

      <section aria-labelledby="core-skills-heading" className="pb-4">
        <SectionTitle id="core-skills-heading" title={t('nav.skills')} />
        <motion.div
          className="grid gap-10 md:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <SkillGroupList
            heading={t('skills.businessSkills.heading')}
            items={businessSkills.map((item) => pickText(item.title, i18n.language))}
          />
          <SkillGroupList heading={t('skills.technicalSkills.heading')} items={technicalSkills} />
          <SkillGroupList
            heading={t('skills.officeProductivity.heading')}
            items={officeProductivity.map((item) => item.title)}
          />
        </motion.div>
      </section>

      <section aria-labelledby="languages-heading" className="pb-4">
        <SectionTitle
          id="languages-heading"
          title={t('skills.languages.heading')}
          description={t('skills.languages.description')}
        />
        <motion.div
          className="grid gap-8 sm:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {languages.map((language) => (
            <Card key={language.title.en} className="space-y-2">
              <h3 className="font-heading text-2xl font-bold text-heading">{pickText(language.title, i18n.language)}</h3>
              <p className="text-sm leading-6 text-body">{pickText(language.level, i18n.language)}</p>
            </Card>
          ))}
        </motion.div>
      </section>

      <section aria-labelledby="learning-journey-heading" className="pb-4">
        <SectionTitle
          id="learning-journey-heading"
          title={t('skills.learningJourney.heading')}
          description={t('skills.learningJourney.description')}
        />
        <motion.ol
          className="relative space-y-6 border-l border-border pl-8"
          aria-label={t('skills.learningJourney.heading')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {learningJourney.map((step) => (
            <li key={step} className="relative">
              <span
                className="absolute -left-[2.15rem] top-1 h-2.5 w-2.5 border-2 border-background bg-primary"
                aria-hidden="true"
              />
              <p className="text-lg font-semibold text-heading">{step}</p>
            </li>
          ))}
        </motion.ol>
      </section>
    </div>
  );
}

export default Skills;
