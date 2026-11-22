// Valores fixos usados em Pickers e filtros.
// Os dados gravam apenas a CHAVE (ex.: 'hipertrofia'); o rótulo exibido
// vem do dicionário de tradução (i18n), por isso muda junto com o idioma.

export const STUDENT_STATUS = ['ativo', 'inativo', 'pendente'];

export const GOALS = ['hipertrofia', 'emagrecimento', 'condicionamento', 'saude'];

export const WORKOUT_CATEGORIES = ['hipertrofia', 'emagrecimento', 'forca', 'funcional', 'cardio'];

// Ícone (Ionicons) de cada categoria de treino
export const CATEGORY_ICONS = {
  hipertrofia: 'barbell',
  emagrecimento: 'flame',
  forca: 'trophy',
  funcional: 'body',
  cardio: 'heart',
};

export const LEVELS = ['iniciante', 'intermediario', 'avancado'];

export const PLAN_PERIODS = ['mensal', 'trimestral', 'semestral', 'anual'];

export const MODALITIES = ['spinning', 'yoga', 'pilates', 'crossfit', 'zumba', 'funcional'];

export const WEEK_DAYS = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'];

export const ROLES = ['admin', 'instrutor', 'recepcao'];

export const LANGUAGES = [
  { code: 'pt', flag: '🇧🇷' },
  { code: 'en', flag: '🇺🇸' },
  { code: 'es', flag: '🇪🇸' },
];
