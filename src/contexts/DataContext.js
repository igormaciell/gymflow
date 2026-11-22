// Contexto de dados: carrega e mantém alunos, planos, treinos, aulas e usuários,
// e expõe as operações de CRUD para todas as telas.
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const RESOURCES = ['alunos', 'planos', 'treinos', 'aulas', 'usuarios'];

const EMPTY_DATA = { alunos: [], planos: [], treinos: [], aulas: [], usuarios: [] };

// Garante os tipos corretos (o MockAPI pode devolver números como texto)
const normalizers = {
  alunos: (item) => ({ ...item, id: String(item.id), checkins: Number(item.checkins) || 0 }),
  planos: (item) => ({
    ...item,
    id: String(item.id),
    preco: Number(item.preco) || 0,
    ativo: item.ativo !== false && item.ativo !== 'false',
  }),
  treinos: (item) => ({
    ...item,
    id: String(item.id),
    duracao: Number(item.duracao) || 0,
    exercicios: Array.isArray(item.exercicios) ? item.exercicios : [],
  }),
  aulas: (item) => ({
    ...item,
    id: String(item.id),
    duracao: Number(item.duracao) || 0,
    vagas: Number(item.vagas) || 0,
    inscritos: Number(item.inscritos) || 0,
  }),
  // Nunca deixa a senha dos usuários circular pelas telas
  usuarios: ({ senha, ...item }) => ({ ...item, id: String(item.id) }),
};

const DataContext = createContext({});

export function DataProvider({ children }) {
  const { user } = useAuth();
  const [data, setData] = useState(EMPTY_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    // allSettled: se um recurso falhar, os outros continuam carregando
    const results = await Promise.allSettled(RESOURCES.map((name) => api[name].list()));
    const next = { ...EMPTY_DATA };
    let firstError = null;
    results.forEach((result, index) => {
      const name = RESOURCES[index];
      if (result.status === 'fulfilled' && Array.isArray(result.value)) {
        next[name] = result.value.map(normalizers[name]);
      } else if (!firstError) {
        firstError = (result.reason && result.reason.code) || 'errors.generic';
      }
    });
    setData(next);
    setError(firstError);
    setLoading(false);
  }, []);

  // Efeito colateral: carrega os dados quando alguém faz login e limpa no logout
  useEffect(() => {
    if (user) {
      loadAll();
    } else {
      setData(EMPTY_DATA);
      setError(null);
    }
  }, [user, loadAll]);

  const createItem = useCallback(async (resource, item) => {
    const created = normalizers[resource](await api[resource].create(item));
    setData((prev) => ({ ...prev, [resource]: [...prev[resource], created] }));
    return created;
  }, []);

  const updateItem = useCallback(async (resource, id, changes) => {
    const updated = normalizers[resource](await api[resource].update(id, changes));
    setData((prev) => ({
      ...prev,
      [resource]: prev[resource].map((item) =>
        String(item.id) === String(id) ? { ...item, ...updated } : item,
      ),
    }));
    return updated;
  }, []);

  const removeItem = useCallback(async (resource, id) => {
    await api[resource].remove(id);
    setData((prev) => ({
      ...prev,
      [resource]: prev[resource].filter((item) => String(item.id) !== String(id)),
    }));
  }, []);

  const getById = useCallback(
    (resource, id) => (data[resource] || []).find((item) => String(item.id) === String(id)),
    [data],
  );

  const value = useMemo(
    () => ({ ...data, loading, error, loadAll, createItem, updateItem, removeItem, getById }),
    [data, loading, error, loadAll, createItem, updateItem, removeItem, getById],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => useContext(DataContext);

export default DataContext;
