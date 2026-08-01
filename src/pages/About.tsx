import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Card from '../components/ui/Card';
import SectionTitle from '../components/ui/SectionTitle';
import Badge from '../components/ui/Badge';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { client } from '../data/client';
import { pickText, pickList } from '../utils/localize';

function About() {
  const { t, i18n } = useTranslation();
  useDocumentTitle(`${t('nav.about')} | ${client.personal.fullName}`);
  const careerGoals = pickList(client.about.goals, i18n.language);
  const summaryCards = client.about.highlights;

  return (
    <div className="editorial-index space-y-28">
      <h1 className="sr-only">{t('nav.about')}</h1>

      <section aria-labelledby="about-me-heading" className="pb-4">
        <SectionTitle id="about-me-heading" title={t('about.aboutMe.heading')} />
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-xl leading-9 text-body">{pickText(client.about.introduction, i18n.language)}</p>
        </motion.div>
      </section>

      <section aria-labelledby="career-goal-heading" className="pb-4">
        <SectionTitle
          id="career-goal-heading"
          title={t('about.careerGoal.heading')}
          description={pickText(client.about.description, i18n.language)}
        />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
          <ul className="flex flex-wrap gap-3" aria-label={t('about.careerGoal.heading')}>
            {careerGoals.map((goal) => (
              <li key={goal}>
                <Badge label={goal} />
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      <section aria-labelledby="professional-summary-heading" className="pb-4">
        <SectionTitle
          id="professional-summary-heading"
          title={t('about.professionalSummary.heading')}
          description={pickText(client.about.summary, i18n.language)}
        />
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {summaryCards.map((card) => (
            <Card key={card.title.en} className="space-y-4">
              <h3 className="font-heading text-xl font-bold text-heading">{pickText(card.title, i18n.language)}</h3>
              <p className="text-sm leading-6 text-body">{card.description}</p>
            </Card>
          ))}
        </motion.div>
      </section>
    </div>
  );
}

export default About;
