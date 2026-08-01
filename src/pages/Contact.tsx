import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Github, Mail, Phone } from 'lucide-react';
import LinkButton from '../components/ui/LinkButton';
import SectionTitle from '../components/ui/SectionTitle';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { client } from '../data/client';
import { pickText } from '../utils/localize';

function Contact() {
  const { t, i18n } = useTranslation();
  useDocumentTitle(`${t('nav.contact')} | ${client.personal.fullName}`);
  const phoneHref = `tel:${client.contact.phone.replace(/\s+/g, '')}`;
  const githubDisplay = client.social.github.replace(/^https?:\/\//, '');

  return (
    <div className="editorial-index space-y-28">
      <h1 className="sr-only">{t('nav.contact')}</h1>

      <section aria-labelledby="contact-information-heading" className="pb-4">
        <SectionTitle id="contact-information-heading" title={t('contact.contactInformation.heading')} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <p className="max-w-2xl text-lg leading-8 text-body">{pickText(client.contact.message, i18n.language)}</p>
        </motion.div>
      </section>

      <section aria-labelledby="email-heading" className="pb-4">
        <SectionTitle id="email-heading" title={t('contact.email.heading')} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-primary" aria-hidden="true">
              <Mail className="h-5 w-5 text-primary" strokeWidth={2} />
            </span>
            <LinkButton
              href={`mailto:${client.contact.email}`}
              variant="outline"
              className="min-w-0 max-w-full break-all normal-case tracking-normal"
              aria-label={`${t('contact.email.heading')}: ${client.contact.email}`}
            >
              {client.contact.email}
            </LinkButton>
          </div>
        </motion.div>
      </section>

      <section aria-labelledby="phone-heading" className="pb-4">
        <SectionTitle id="phone-heading" title={t('contact.phone.heading')} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-primary" aria-hidden="true">
              <Phone className="h-5 w-5 text-primary" strokeWidth={2} />
            </span>
            <LinkButton
              href={phoneHref}
              variant="outline"
              className="min-w-0 max-w-full break-all normal-case tracking-normal"
              aria-label={`${t('contact.phone.heading')}: ${client.contact.phone}`}
            >
              {client.contact.phone}
            </LinkButton>
          </div>
        </motion.div>
      </section>

      <section aria-labelledby="github-heading" className="pb-4">
        <SectionTitle id="github-heading" title={t('contact.github.heading')} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-primary" aria-hidden="true">
              <Github className="h-5 w-5 text-primary" strokeWidth={2} />
            </span>
            <LinkButton
              href={client.social.github}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="min-w-0 max-w-full break-all normal-case tracking-normal"
              aria-label={`${t('contact.github.heading')}: ${githubDisplay}`}
            >
              {githubDisplay}
            </LinkButton>
          </div>
        </motion.div>
      </section>

      <section aria-labelledby="contact-cta-heading" className="pb-4">
        <SectionTitle
          id="contact-cta-heading"
          title={t('contact.cta.heading')}
          description={t('contact.cta.description')}
        />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <LinkButton href={`mailto:${client.contact.email}`} variant="primary">
            <Mail className="h-4 w-4" aria-hidden="true" />
            {t('contact.cta.button')}
          </LinkButton>
        </motion.div>
      </section>
    </div>
  );
}

export default Contact;
