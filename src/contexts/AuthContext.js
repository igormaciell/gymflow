// Contexto de autenticação: usuário logado, login, cadastro, logout e edição de perfil.
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { api, createAppError } from '../services/api';

const AuthContext = createContext({});

// Remove a senha antes de guardar o usuário no estado
const withoutPassword = ({ senha, ...user }) => user;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback(async (email, senha) => {
    const users = await api.usuarios.list();
    const found = users.find(
      (item) =>
        String(item.email).toLowerCase() === email.trim().toLowerCase() && item.senha === senha,
    );
    if (!found) throw createAppError('auth.invalid');
    const safeUser = withoutPassword(found);
    setUser(safeUser);
    return safeUser;
  }, []);

  const register = useCallback(async (values) => {
    const { nome, email, telefone, cargo, senha } = values;
    const users = await api.usuarios.list();
    const exists = users.some(
      (item) => String(item.email).toLowerCase() === email.trim().toLowerCase(),
    );
    if (exists) throw createAppError('auth.emailInUse');
    const created = await api.usuarios.create({
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      telefone,
      cargo,
      senha,
      criadoEm: new Date().toISOString(),
    });
    return withoutPassword(created);
  }, []);

  const updateProfile = useCallback(
    async (changes) => {
      if (!user) return null;
      const updated = await api.usuarios.update(user.id, changes);
      const safeUser = withoutPassword({ ...user, ...updated });
      setUser(safeUser);
      return safeUser;
    },
    [user],
  );

  const logout = useCallback(() => setUser(null), []);

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), login, register, logout, updateProfile }),
    [user, login, register, logout, updateProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
