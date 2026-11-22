// Stack Navigator principal.
// - Sem login: Login e Cadastro.
// - Com login: o Drawer (menu lateral) + telas empilhadas de detalhes e formulários.
import React, { useCallback } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerRoutes from './DrawerRoutes';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import StudentDetailScreen from '../screens/StudentDetail';
import StudentFormScreen from '../screens/StudentForm';
import PlanFormScreen from '../screens/PlanForm';
import WorkoutDetailScreen from '../screens/WorkoutDetail';
import WorkoutFormScreen from '../screens/WorkoutForm';
import ClassFormScreen from '../screens/ClassForm';
import { colors } from '../constants/theme';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';

const Stack = createStackNavigator();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.accent,
    background: colors.background,
    card: colors.primary,
    text: colors.textOnPrimary,
    border: colors.primary,
  },
};

export default function Routes() {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const { showToast } = useToast();

  // Tratamento de erro: ação de navegação para uma rota que não existe
  const handleUnhandledAction = useCallback(
    (action) => {
      console.warn('[navegação] Ação não tratada:', action.type, action.payload);
      showToast(t('errors.navigation'), 'error');
    },
    [showToast, t],
  );

  return (
    <NavigationContainer theme={navigationTheme} onUnhandledAction={handleUnhandledAction}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.textOnPrimary,
          headerTitleStyle: { fontWeight: '700' },
          headerBackTitle: t('common.back'),
          cardStyle: { backgroundColor: colors.background },
        }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Main" component={DrawerRoutes} options={{ headerShown: false }} />
            <Stack.Screen
              name="StudentDetail"
              component={StudentDetailScreen}
              options={{ title: t('screens.studentDetail') }}
            />
            <Stack.Screen
              name="StudentForm"
              component={StudentFormScreen}
              options={{ title: t('screens.newStudent') }}
            />
            <Stack.Screen
              name="PlanForm"
              component={PlanFormScreen}
              options={{ title: t('screens.newPlan') }}
            />
            <Stack.Screen
              name="WorkoutDetail"
              component={WorkoutDetailScreen}
              options={{ title: t('screens.workoutDetail') }}
            />
            <Stack.Screen
              name="WorkoutForm"
              component={WorkoutFormScreen}
              options={{ title: t('screens.newWorkout') }}
            />
            <Stack.Screen
              name="ClassForm"
              component={ClassFormScreen}
              options={{ title: t('screens.newClass') }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: t('screens.register') }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
