// Navegação segura: evita que um erro de navegação derrube o app.
export function safeNavigate(navigation, routeName, params, onError) {
  try {
    if (!navigation || typeof navigation.navigate !== 'function') {
      throw new Error('navigation indisponível');
    }
    navigation.navigate(routeName, params);
  } catch (error) {
    console.warn(`[navegação] Falha ao abrir "${routeName}":`, error.message);
    if (onError) onError(error);
  }
}

// Volta para a tela anterior ou, se não houver histórico, para a rota informada
export function safeGoBack(navigation, fallbackRoute = 'Main') {
  try {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.navigate(fallbackRoute);
  } catch (error) {
    console.warn('[navegação] Falha ao voltar:', error.message);
  }
}
