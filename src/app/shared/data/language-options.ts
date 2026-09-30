export interface LanguageOption {
  label: string;
  value: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { label: 'Bash', value: 'bash' },
  { label: 'CSS', value: 'css' },
  { label: 'Docker', value: 'docker' },
  { label: 'HTTP', value: 'http' },
  { label: 'Java', value: 'java' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'JSON', value: 'json' },
  { label: 'SQL', value: 'sql' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'YAML', value: 'yaml' }
];

export const LANGUAGE_FILTER_OPTIONS: LanguageOption[] = [
  { label: 'Tous les langages', value: '' },
  ...LANGUAGE_OPTIONS
];

export const SNIPPET_LANGUAGE_OPTIONS: LanguageOption[] = LANGUAGE_OPTIONS;
