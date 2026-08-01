import { Gem, Heart, type LucideIcon } from 'lucide-react';
import { useTheme, type ThemeName } from '../../theme/ThemeContext';

interface SectionTitleProps {
  title: string;
  description?: string;
  id?: string;
}

interface SectionDecoration {
  icon: LucideIcon | null;
  iconClassName: string;
  divider: string;
}

const decorationByTheme: Record<ThemeName, SectionDecoration> = {
  classic: { icon: null, iconClassName: '', divider: 'h-[3px] w-16 bg-primary' },
  neon: { icon: null, iconClassName: '', divider: 'h-[3px] w-16 bg-gradient-to-r from-primary to-accent' },
  editorial: { icon: null, iconClassName: '', divider: 'h-0 w-20 border-t-2 border-dashed border-primary' },
  candy: { icon: Heart, iconClassName: 'fill-primary text-primary', divider: 'h-0 w-20 border-t-2 border-dashed border-primary' },
  'luxury-noir': {
    icon: Gem,
    iconClassName: 'text-primary',
    divider: 'h-px w-20 bg-gradient-to-r from-primary-600 via-primary to-primary-300'
  }
};

function SectionTitle({ title, description, id }: SectionTitleProps) {
  const { theme } = useTheme();
  const decoration = decorationByTheme[theme];
  const Icon = decoration.icon;

  return (
    <div className="relative z-10 mb-12 max-w-3xl sm:mb-16">
      <div className="flex items-center gap-3">
        <h2 id={id} className="font-heading text-3xl font-bold uppercase tracking-tight text-heading sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {Icon ? <Icon className={`h-5 w-5 shrink-0 ${decoration.iconClassName}`} aria-hidden="true" /> : null}
      </div>
      <span className={`mt-5 block ${decoration.divider}`} aria-hidden="true" />
      {description ? <p className="mt-6 max-w-2xl text-base leading-8 text-body">{description}</p> : null}
    </div>
  );
}

export default SectionTitle;
