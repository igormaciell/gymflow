// Paleta de cores e tokens de design do GymFlow.
// Esquema complementar: azul-marinho (confiança/disciplina) x laranja (energia/ação).
// Regra 60-30-10: 60% neutros claros, 30% azul-marinho, 10% laranja.

export const colors = {
  primary: '#14213D', // azul-marinho: cabeçalhos, drawer, títulos
  primaryLight: '#24375E', // variação para estados ativos sobre o marinho
  accent: '#E85D04', // laranja vibrante: ícones, destaques, gráficos (4.56:1 sobre o marinho)
  accentDark: '#C2410C', // laranja escuro: botões com texto branco (5.18:1)
  accentSoft: '#FFF1E8', // fundo suave para chips/destaques
  success: '#1F7A70', // verde-azulado: status ativo, confirmações
  successSoft: '#E0F2EF',
  warning: '#B45309', // âmbar: pendências
  warningSoft: '#FEF3C7',
  danger: '#C62828', // vermelho: exclusão, erros de validação
  dangerSoft: '#FDECEA',
  background: '#F5F6FA', // fundo neutro das telas
  surface: '#FFFFFF', // cartões e campos
  text: '#1F2937', // texto principal (13.6:1 sobre o fundo)
  textMuted: '#5B6472', // texto secundário (5.5:1 sobre o fundo)
  textOnPrimary: '#FFFFFF',
  border: '#E3E6EE',
  overlay: 'rgba(20, 33, 61, 0.55)',
};

// Cores usadas nas séries dos gráficos do dashboard (mesma família da paleta)
export const chartColors = ['#14213D', '#E85D04', '#1F7A70', '#B45309', '#4F6D9A', '#8A5A44'];

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
};

export const fontSize = {
  caption: 12,
  small: 14,
  body: 16,
  subtitle: 18,
  title: 22,
  hero: 28,
};

export const shadow = {
  shadowColor: '#14213D',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 2,
};

// Cada categoria de treino tem uma cor fixa da paleta (todas com contraste >= 4.5:1 com texto branco)
export const categoryColors = {
  hipertrofia: '#14213D',
  emagrecimento: '#C2410C',
  forca: '#8A5A44',
  funcional: '#1F7A70',
  cardio: '#C62828',
};
