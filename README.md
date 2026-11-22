# GymFlow: app de gestão de academia

Trabalho do 2º bimestre de **Desenvolvimento Mobile**. App em React Native + Expo (Snack) com 15 telas, Stack Navigator + Drawer customizado, React Context, tradução PT/EN/ES com i18n-js, formulários com Formik e CRUD em API RESTful (MockAPI) com fallback para dados locais.

**Login de teste:** `admin@gymflow.com` / `123456` (toque no texto "Acesso de teste" na tela de login para preencher).

---

## 1. Como abrir no Snack (snack.expo.dev)

### Opção A: importar do GitHub (recomendada)
1. Crie um repositório **público** no GitHub e envie todos os arquivos desta pasta (App.js, package.json, app.json e a pasta `src`).
2. Acesse https://snack.expo.dev, abra o menu do projeto e escolha **Import git repository**.
3. Cole a URL do repositório e confirme.
4. Na barra inferior do Snack, selecione o **SDK 56** (se ele não estiver na lista, escolha o mais recente e aceite a atualização de dependências que o Snack sugerir).

### Opção B: enviar os arquivos manualmente
1. Crie um Snack novo em https://snack.expo.dev.
2. Arraste os arquivos e pastas para o explorador de arquivos do Snack (lado esquerdo), mantendo a estrutura de pastas, ou crie os arquivos e cole o conteúdo.
3. Substitua o `package.json` e o `App.js` do Snack pelos deste projeto.

> O preview funciona na **Web**, no **Android** e no **iOS** (via Expo Go, lendo o QR Code). Na Web o diálogo de confirmação usa um `Modal` próprio, porque o `Alert` nativo não funciona no navegador.

> **Erro "No default export of 'index.js' to render!" no Android/iOS:** o Snack precisa que o ponto de entrada seja o `App.js`. Não deixe um arquivo `index.js` na raiz do projeto e não coloque o campo `"main"` no `package.json`.

### Rodar localmente (opcional)
```bash
npm install
npx expo install react-dom react-native-web @expo/metro-runtime   # só para rodar na web
npx expo start
```

---

## 2. Configurar o MockAPI (API RESTful)

O app funciona **sem configurar nada**: nesse caso ele usa o arquivo `src/data/db.json` mantido em memória (estado). Para usar uma API REST de verdade:

1. Crie uma conta em https://mockapi.io e um projeto.
2. Crie os recursos com os campos abaixo (o plano gratuito tem poucos recursos por projeto, então dividam entre as contas do grupo, por exemplo: integrante 1 → `alunos` e `treinos`; integrante 2 → `planos` e `aulas`; integrante 3 → `usuarios`).
3. Copie a URL de cada recurso e cole em `src/config/api.js`:

```js
export const API_CONFIG = {
  usuarios: 'https://SEU-ID.mockapi.io/api/v1/usuarios',
  alunos: 'https://SEU-ID.mockapi.io/api/v1/alunos',
  planos: '',   // vazio = usa os dados locais
  treinos: '',
  aulas: '',
};
```

| Recurso | Campos (tipo) |
|---|---|
| `usuarios` | nome, email, telefone, cargo, senha, criadoEm (texto) |
| `alunos` | nome, email, telefone, nascimento, objetivo, planoId, status, treinoId, observacoes, criadoEm, ultimoCheckin (texto); checkins (número) |
| `planos` | nome, periodo, descricao (texto); preco (número); ativo (booleano) |
| `treinos` | nome, categoria, nivel, descricao (texto); duracao (número); exercicios (Array/Object com `nome`, `series`, `repeticoes`) |
| `aulas` | modalidade, instrutor, dia, horario, sala (texto); duracao, vagas, inscritos (número) |

**Dados iniciais:** um recurso novo no MockAPI começa vazio. Vocês podem cadastrar os registros pelo próprio app ou copiar o array correspondente de `src/data/db.json` para o editor de dados do recurso no painel do MockAPI. Se `usuarios` estiver no MockAPI, crie o primeiro usuário pela tela **Cadastre-se** antes de fazer login.

O Dashboard mostra no rodapé qual a fonte dos dados ("Dados locais" ou "MockAPI (recursos)"). Se uma URL estiver errada, aparece um aviso de erro com botão **Tentar novamente**, e os outros recursos continuam carregando.

---

## 3. Telas (15)

| # | Tela | Tipo | Navegador |
|---|---|---|---|
| 1 | Login | Obrigatória | Stack |
| 2 | Cadastro de usuário (validação de todos os campos) | Obrigatória | Stack |
| 3 | Dashboard (indicadores e gráficos) | Obrigatória | Drawer |
| 4 | Idioma (PT / EN / ES) | Obrigatória | Drawer |
| 5 | Alunos: lista com busca e filtros (status, plano) | Customizada | Drawer |
| 6 | Novo / editar aluno | Customizada | Stack |
| 7 | Detalhes do aluno (check-in, excluir) | Customizada | Stack |
| 8 | Planos: lista com filtros (periodicidade, status) | Customizada | Drawer |
| 9 | Novo / editar plano | Customizada | Stack |
| 10 | Treinos: lista com busca e filtros (categoria, nível) | Customizada | Drawer |
| 11 | Novo / editar treino (lista dinâmica de exercícios) | Customizada | Stack |
| 12 | Detalhes do treino (checklist e progresso) | Customizada | Stack |
| 13 | Aulas coletivas: grade com filtros (dia, modalidade) | Customizada | Drawer |
| 14 | Nova / editar aula | Customizada | Stack |
| 15 | Meu perfil (editar dados, sair) | Customizada | Drawer |

---

## 4. Onde cada requisito do trabalho está no código

| Requisito | Onde |
|---|---|
| Stack Navigator | `src/navigation/index.js` (`createStackNavigator`) |
| Drawer Navigator customizado | `src/navigation/DrawerRoutes.js` + `src/components/CustomDrawer` + `src/components/DrawerMenuItem` |
| Tratamento de erros na navegação | `onUnhandledAction` no `NavigationContainer`; `src/utils/navigation.js` (`safeNavigate`, `safeGoBack`); telas de detalhe/edição validam o `id` recebido e exibem "registro não encontrado" |
| Contexto (createContext / useContext) | `src/contexts/`: `LanguageContext`, `AuthContext`, `DataContext`, `ToastContext` |
| Comunicação direta e indireta com desestruturação | Direta: props desestruturadas nos componentes (ex.: `StudentCard({ student, planName, onPress })`). Indireta: `const { alunos, planos } = useData()` |
| Passagem de parâmetros | `navigate('StudentDetail', { id })`, `const { id } = route.params`; cadastro → login com `popTo('Login', { registered, email })` |
| Componentização (pasta com index.js e styles.js) | `src/components/*` (32 componentes) e `src/screens/*` (15 telas) |
| Filtros com RNPicker + FlatList (pai filtra o filho) | Telas Alunos, Planos, Treinos e Aulas guardam o filtro (`FilterPicker` → `SelectInput` com `@react-native-picker/picker`) e entregam a lista filtrada ao `DataList` (FlatList) |
| useEffect para efeitos colaterais e exceções | Carga da API ao logar (`DataContext`), sincronização do i18n (`LanguageContext`), timer do `Toast`, título dinâmico das telas, reset de filtro inválido (Alunos), mensagem pós-cadastro (Login) |
| i18n (dicionário + função de tradução) | `src/i18n/index.js` (`new I18n({ pt, en, es })`) e `src/i18n/locales/*.js`. Todos os textos, rótulos, menus, títulos e mensagens de validação usam `t('chave')` |
| Formulários com Formik + validação | Todas as telas de formulário usam `<Formik validate={...}>`; regras em `src/utils/validators.js` |
| API RESTful com CRUD | `src/services/api.js` (GET, POST, PUT, DELETE com `fetch`, timeout e tratamento de erros) + fallback local `src/data/db.json` |
| Dashboard | `src/screens/Dashboard` + `src/components/StatCard` e `BarChart` (gráfico feito só com View) |

---

## 5. Estrutura de pastas

```
App.js                  → provedores de contexto + rotas
src/
  config/api.js         → URLs do MockAPI
  constants/            → paleta (theme.js) e opções dos Pickers (options.js)
  contexts/             → Language, Auth, Data e Toast
  data/db.json          → dados locais (fallback)
  i18n/                 → configuração do i18n-js e dicionários pt/en/es
  navigation/           → Stack (index.js) e Drawer (DrawerRoutes.js)
  services/api.js       → acesso à API REST / dados locais
  utils/                → validações, máscaras/formatação e navegação segura
  components/<Nome>/    → index.js + styles.js
  screens/<Nome>/       → index.js + styles.js
```

## 6. Dependências

React Navigation (`@react-navigation/native`, `stack`, `drawer` e as dependências obrigatórias dela: `react-native-gesture-handler`, `react-native-reanimated`, `react-native-worklets`, `react-native-screens`, `react-native-safe-area-context`), `@react-native-picker/picker` (RNPicker), `formik`, `i18n-js` e `@expo/vector-icons` (ícones, já incluso no Expo). Os gráficos do dashboard foram feitos só com `View`, sem biblioteca externa.

> Atenção à Obs. 1 do enunciado: se o professor não tiver passado alguma dessas bibliotecas em aula (por exemplo `@expo/vector-icons`), validem com ele antes da entrega.
