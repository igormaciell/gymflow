// Máscaras e formatações de exibição
import { INTL_LOCALES } from '../i18n';
import { onlyDigits } from './validators';

// (27) 99999-9999
export function maskPhone(value = '') {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

// dd/mm/aaaa
export function maskDate(value = '') {
  const digits = onlyDigits(value).slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

// hh:mm
export function maskTime(value = '') {
  const digits = onlyDigits(value).slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}:${digits.slice(2)}`;
}

export function formatCurrency(value, locale = 'pt') {
  const number = Number(value) || 0;
  try {
    return new Intl.NumberFormat(INTL_LOCALES[locale] || 'pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(number);
  } catch (error) {
    // Alguns ambientes não suportam Intl: usa um formato simples
    return `R$ ${number.toFixed(2).replace('.', ',')}`;
  }
}

export function formatDate(isoString, locale = 'pt') {
  if (!isoString) return '-';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '-';
  try {
    return date.toLocaleDateString(INTL_LOCALES[locale] || 'pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch (error) {
    return date.toISOString().slice(0, 10);
  }
}

// Quantos meses cada periodicidade representa (para calcular o valor mensal)
export const PERIOD_MONTHS = { mensal: 1, trimestral: 3, semestral: 6, anual: 12 };

export const monthlyValue = ({ preco, periodo } = {}) =>
  (Number(preco) || 0) / (PERIOD_MONTHS[periodo] || 1);

// Iniciais para o avatar: "Ana Beatriz Lima" -> "AL"
export function getInitials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return `${first}${last}`.toUpperCase();
}

// Normaliza texto para busca sem acento e sem maiúsculas
export const normalizeText = (text = '') =>
  String(text).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
