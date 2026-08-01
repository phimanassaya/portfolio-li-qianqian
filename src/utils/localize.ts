export type Lang = "en" | "th" | "zh";

export function pickText(value: Record<Lang, string>, lang: string): string {
  return value[lang as Lang] ?? value.en;
}

export function pickList(value: Record<Lang, string[]>, lang: string): string[] {
  return value[lang as Lang] ?? value.en;
}
