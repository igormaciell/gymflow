// Camada de acesso a dados (API RESTful com CRUD).
// - Se o recurso tiver URL em src/config/api.js -> usa fetch no MockAPI (GET/POST/PUT/DELETE).
// - Se não tiver -> usa os dados do arquivo local db.json mantidos em memória (estado).
import { API_CONFIG, REQUEST_TIMEOUT } from '../config/api';
import seed from '../data/db.json';

// Cópia em memória do arquivo JSON (as alterações valem enquanto o app estiver aberto)
const localDb = JSON.parse(JSON.stringify(seed));

// Cria um erro com um código que a interface traduz (ex.: 'errors.network')
export function createAppError(code, detail) {
  const error = new Error(detail || code);
  error.code = code;
  return error;
}

// Requisição HTTP genérica com tempo limite e tratamento de erros
async function request(url, { method = 'GET', body } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    if (response.status === 404) throw createAppError('errors.notFound');
    if (!response.ok) throw createAppError('errors.generic', `HTTP ${response.status}`);

    return await response.json();
  } catch (error) {
    if (error.code) throw error;
    if (error.name === 'AbortError') throw createAppError('errors.timeout');
    throw createAppError('errors.network', error.message);
  } finally {
    clearTimeout(timer);
  }
}

// Simula a latência de uma API para o modo local
const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

const nextId = (list) =>
  String(list.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1);

// Implementação local (mock) com a mesma interface da remota
function createLocalResource(name) {
  if (!localDb[name]) localDb[name] = [];

  return {
    async list() {
      await delay();
      return localDb[name].map((item) => ({ ...item }));
    },
    async get(id) {
      await delay();
      const found = localDb[name].find((item) => String(item.id) === String(id));
      if (!found) throw createAppError('errors.notFound');
      return { ...found };
    },
    async create(data) {
      await delay();
      const created = { ...data, id: nextId(localDb[name]) };
      localDb[name].push(created);
      return { ...created };
    },
    async update(id, data) {
      await delay();
      const index = localDb[name].findIndex((item) => String(item.id) === String(id));
      if (index < 0) throw createAppError('errors.notFound');
      localDb[name][index] = { ...localDb[name][index], ...data, id: localDb[name][index].id };
      return { ...localDb[name][index] };
    },
    async remove(id) {
      await delay();
      const index = localDb[name].findIndex((item) => String(item.id) === String(id));
      if (index < 0) throw createAppError('errors.notFound');
      const [removed] = localDb[name].splice(index, 1);
      return removed;
    },
  };
}

// Implementação remota (MockAPI) - endpoints REST padrão
function createRemoteResource(baseUrl) {
  const url = baseUrl.replace(/\/+$/, '');
  return {
    list: () => request(url),
    get: (id) => request(`${url}/${id}`),
    create: (data) => request(url, { method: 'POST', body: data }),
    update: (id, data) => request(`${url}/${id}`, { method: 'PUT', body: data }),
    remove: (id) => request(`${url}/${id}`, { method: 'DELETE' }),
  };
}

export function createResource(name) {
  const baseUrl = (API_CONFIG[name] || '').trim();
  return baseUrl ? createRemoteResource(baseUrl) : createLocalResource(name);
}

// Informa se o recurso está usando a API remota (exibido no dashboard)
export const isRemote = (name) => Boolean((API_CONFIG[name] || '').trim());

export const api = {
  usuarios: createResource('usuarios'),
  alunos: createResource('alunos'),
  planos: createResource('planos'),
  treinos: createResource('treinos'),
  aulas: createResource('aulas'),
};
