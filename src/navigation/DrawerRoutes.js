// Drawer Navigator (menu lateral) com conteúdo customizado (CustomDrawer)
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import DashboardScreen from '../screens/Dashboard';
import StudentsScreen from '../screens/Students';
import WorkoutsScreen from '../screens/Workouts';
import PlansScreen from '../screens/Plans';
import ClassesScreen from '../screens/Classes';
import ProfileScreen from '../screens/Profile';
import LanguageScreen from '../screens/Language';
import { colors } from '../constants/theme';
import { useLanguage } from '../contexts/LanguageContext';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  const { t } = useLanguage();

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.textOnPrimary,
        headerTitleStyle: { fontWeight: '700' },
        drawerStyle: { backgroundColor: colors.primary, width: 290 },
        drawerType: 'front',
        overlayColor: colors.overlay,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: t('menu.dashboard') }}
      />
      <Drawer.Screen
        name="Students"
        component={StudentsScreen}
        options={{ title: t('menu.students') }}
      />
      <Drawer.Screen
        name="Workouts"
        component={WorkoutsScreen}
        options={{ title: t('menu.workouts') }}
      />
      <Drawer.Screen name="Plans" component={PlansScreen} options={{ title: t('menu.plans') }} />
      <Drawer.Screen
        name="Classes"
        component={ClassesScreen}
        options={{ title: t('menu.classes') }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: t('menu.profile') }}
      />
      <Drawer.Screen
        name="Language"
        component={LanguageScreen}
        options={{ title: t('menu.language') }}
      />
    </Drawer.Navigator>
  );
}
