import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../../components/ui/SectionTitle';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { client } from '../../data/client';
import { pickText } from '../../utils/localize';

function FutureProjects() {
  const { i18n } = useTranslation();
  const project = client.projects.find((p) => p.id === 'future-projects')!;
  const projectTitle = pickText(project.title, i18n.language);
  useDocumentTitle(`${projectTitle} | ${client.personal.fullName}`);

  return (
    <div className="editorial-index space-y-28">
      <h1 className="sr-only">{projectTitle}</h1>
      <section aria-labelledby="future-projects-heading" className="pb-4">
        <SectionTitle
          id="future-projects-heading"
          title={projectTitle}
          description={pickText(project.category, i18n.language)}
        />
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-lg leading-8 text-body">{pickText(project.description, i18n.language)}</p>
        </motion.div>
      </section>
    </div>
  );
}

export default FutureProjects;
