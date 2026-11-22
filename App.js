// GymFlow - App de gestão de academia
// Trabalho do 2º bimestre - Desenvolvimento Mobile
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './src/navigation';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { ToastProvider } from './src/contexts/ToastContext';
import { AuthProvider } from './src/contexts/AuthContext';
import { DataProvider } from './src/contexts/DataContext';
import { colors } from './src/constants/theme';

// Ordem dos provedores: idioma -> mensagens -> autenticação -> dados -> navegação
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <LanguageProvider>
          <ToastProvider>
            <AuthProvider>
              <DataProvider>
                <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
                <Routes />
              </DataProvider>
            </AuthProvider>
          </ToastProvider>
        </LanguageProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
