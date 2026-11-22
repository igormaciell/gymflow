import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Avatar from '../Avatar';
import DrawerMenuItem from '../DrawerMenuItem';
import ConfirmModal from '../ConfirmModal';
import styles from './styles';
import { colors } from '../../constants/theme';
import { LANGUAGES } from '../../constants/options';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { safeNavigate } from '../../utils/navigation';

// Ícone de cada rota do Drawer
const ROUTE_ICONS = {
  Dashboard: 'grid-outline',
  Students: 'people-outline',
  Workouts: 'barbell-outline',
  Plans: 'pricetags-outline',
  Classes: 'calendar-outline',
  Profile: 'person-circle-outline',
  Language: 'language-outline',
};

// Conteúdo customizado do Drawer Navigator: cabeçalho com o usuário,
// itens com ícones traduzidos, indicador do idioma e botão de sair.
export default function CustomDrawer(props) {
  const { state, navigation, descriptors } = props;
  const { user, logout } = useAuth();
  const { t, locale } = useLanguage();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const currentLanguage = LANGUAGES.find(({ code }) => code === locale);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Avatar name={user?.nome} size={64} color={colors.accent} />
          <Text style={styles.name} numberOfLines={1}>
            {user?.nome}
          </Text>
          <Text style={styles.email} numberOfLines={1}>
            {user?.email}
          </Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{t(`roles.${user?.cargo || 'admin'}`)}</Text>
          </View>
        </View>

        <View style={styles.menu}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            return (
              <DrawerMenuItem
                key={route.key}
                label={options.title || route.name}
                icon={ROUTE_ICONS[route.name] || 'ellipse-outline'}
                active={state.index === index}
                onPress={() => safeNavigate(navigation, route.name)}
              />
            );
          })}
        </View>
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <Text style={styles.languageInfo}>
          {currentLanguage?.flag} {t(`language.native.${locale}`)}
        </Text>
        <DrawerMenuItem
          label={t('menu.logout')}
          icon="log-out-outline"
          danger
          onPress={() => setConfirmLogout(true)}
        />
      </View>

      <ConfirmModal
        visible={confirmLogout}
        title={t('menu.logoutTitle')}
        message={t('menu.logoutMessage')}
        confirmLabel={t('menu.logout')}
        icon="log-out-outline"
        onCancel={() => setConfirmLogout(false)}
        onConfirm={() => {
          setConfirmLogout(false);
          logout();
        }}
      />
    </View>
  );
}
