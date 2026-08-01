import { Github, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { client } from '../data/client';
import { pickText } from '../utils/localize';

function Footer() {
  const { t, i18n } = useTranslation();

  return (
    <footer className="border-t border-border px-6 py-12 text-center sm:px-10">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <a
            href={client.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-secondary transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={t('footer.social.github')}
          >
            <Github size={16} />
          </a>
          <a
            href={`mailto:${client.contact.email}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-secondary transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={t('footer.social.email')}
          >
            <Mail size={16} />
          </a>
        </div>
        <p className="text-xs leading-6 text-secondary">{pickText(client.about.footerTagline, i18n.language)}</p>
        <p className="text-[10px] uppercase tracking-[0.18em] text-secondary/70">
          {t('footer.rights', { year: client.seo.copyrightYear, name: client.personal.fullName })}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
