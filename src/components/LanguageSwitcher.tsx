import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border p-1">
      <button
        type="button"
        aria-label={t('language.switchToEnglish')}
        aria-pressed={i18n.language === 'en'}
        className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
          i18n.language === 'en'
            ? 'bg-gradient-to-r from-primary-600 via-primary to-primary-300 text-background'
            : 'text-secondary hover:text-heading'
        }`}
        onClick={() => i18n.changeLanguage('en')}
      >
        EN
      </button>
      <button
        type="button"
        aria-label={t('language.switchToThai')}
        aria-pressed={i18n.language === 'th'}
        className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
          i18n.language === 'th'
            ? 'bg-gradient-to-r from-primary-600 via-primary to-primary-300 text-background'
            : 'text-secondary hover:text-heading'
        }`}
        onClick={() => i18n.changeLanguage('th')}
      >
        TH
      </button>
      <button
        type="button"
        aria-label={t('language.switchToChinese')}
        aria-pressed={i18n.language === 'zh'}
        className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
          i18n.language === 'zh'
            ? 'bg-gradient-to-r from-primary-600 via-primary to-primary-300 text-background'
            : 'text-secondary hover:text-heading'
        }`}
        onClick={() => i18n.changeLanguage('zh')}
      >
        ZH
      </button>
    </div>
  );
}

export default LanguageSwitcher;
