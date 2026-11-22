// Funções de validação usadas pelo Formik (prop "validate").
// Cada função devolve um objeto { campo: 'chave.de.traducao' }.
// A mensagem é traduzida na hora de exibir, então acompanha o idioma atual.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const onlyDigits = (value = '') => String(value).replace(/\D/g, '');

export const isEmpty = (value) =>
  value === undefined || value === null || String(value).trim() === '';

export const isEmail = (value = '') => EMAIL_REGEX.test(String(value).trim());

export const isPhone = (value = '') => {
  const digits = onlyDigits(value);
  return digits.length === 10 || digits.length === 11;
};

// Converte '129,90' ou '129.90' em número
export const toNumber = (value) => Number(String(value).replace(',', '.'));

export const isPositiveNumber = (value) => !isEmpty(value) && toNumber(value) > 0;

export const isPositiveInteger = (value) =>
  !isEmpty(value) && /^\d+$/.test(String(value).trim()) && Number(value) > 0;

// dd/mm/aaaa -> Date (ou null se inválida)
export function parseDate(value = '') {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(value).trim());
  if (!match) return null;
  const [, dd, mm, yyyy] = match;
  const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  const valid =
    date.getFullYear() === Number(yyyy) &&
    date.getMonth() === Number(mm) - 1 &&
    date.getDate() === Number(dd);
  return valid ? date : null;
}

export function getAge(value) {
  const date = parseDate(value);
  if (!date) return null;
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const beforeBirthday =
    today.getMonth() < date.getMonth() ||
    (today.getMonth() === date.getMonth() && today.getDate() < date.getDate());
  if (beforeBirthday) age -= 1;
  return age;
}

export const isTime = (value = '') => /^([01]\d|2[0-3]):[0-5]\d$/.test(String(value).trim());

// ---------------------------------------------------------------------
// Validações por formulário
// ---------------------------------------------------------------------

export function validateLogin({ email, senha }) {
  const errors = {};
  if (isEmpty(email)) errors.email = 'validation.required';
  else if (!isEmail(email)) errors.email = 'validation.email';
  if (isEmpty(senha)) errors.senha = 'validation.required';
  return errors;
}

function validateName(nome, errors) {
  if (isEmpty(nome)) errors.nome = 'validation.required';
  else if (nome.trim().length < 3) errors.nome = 'validation.nameMin';
  else if (nome.trim().split(/\s+/).length < 2) errors.nome = 'validation.fullName';
}

function validatePhoneField(telefone, errors) {
  if (isEmpty(telefone)) errors.telefone = 'validation.required';
  else if (!isPhone(telefone)) errors.telefone = 'validation.phone';
}

export function validateRegister(values) {
  const { nome, email, telefone, cargo, senha, confirmarSenha, termos } = values;
  const errors = {};
  validateName(nome, errors);
  if (isEmpty(email)) errors.email = 'validation.required';
  else if (!isEmail(email)) errors.email = 'validation.email';
  validatePhoneField(telefone, errors);
  if (isEmpty(cargo)) errors.cargo = 'validation.select';
  if (isEmpty(senha)) errors.senha = 'validation.required';
  else if (senha.length < 6) errors.senha = 'validation.passwordMin';
  if (isEmpty(confirmarSenha)) errors.confirmarSenha = 'validation.required';
  else if (confirmarSenha !== senha) errors.confirmarSenha = 'validation.passwordMatch';
  if (!termos) errors.termos = 'validation.terms';
  return errors;
}

export function validateProfile({ nome, telefone, cargo }) {
  const errors = {};
  validateName(nome, errors);
  validatePhoneField(telefone, errors);
  if (isEmpty(cargo)) errors.cargo = 'validation.select';
  return errors;
}

export function validateStudent(values) {
  const { nome, email, telefone, nascimento, objetivo, planoId, status } = values;
  const errors = {};
  validateName(nome, errors);
  if (isEmpty(email)) errors.email = 'validation.required';
  else if (!isEmail(email)) errors.email = 'validation.email';
  validatePhoneField(telefone, errors);
  if (isEmpty(nascimento)) errors.nascimento = 'validation.required';
  else if (!parseDate(nascimento)) errors.nascimento = 'validation.date';
  else {
    const age = getAge(nascimento);
    if (age < 12 || age > 100) errors.nascimento = 'validation.age';
  }
  if (isEmpty(objetivo)) errors.objetivo = 'validation.select';
  if (isEmpty(planoId)) errors.planoId = 'validation.select';
  if (isEmpty(status)) errors.status = 'validation.select';
  return errors;
}

export function validatePlan({ nome, preco, periodo, descricao }) {
  const errors = {};
  if (isEmpty(nome)) errors.nome = 'validation.required';
  else if (nome.trim().length < 3) errors.nome = 'validation.nameMin';
  if (isEmpty(preco)) errors.preco = 'validation.required';
  else if (!isPositiveNumber(preco)) errors.preco = 'validation.positiveNumber';
  if (isEmpty(periodo)) errors.periodo = 'validation.select';
  if (isEmpty(descricao)) errors.descricao = 'validation.required';
  return errors;
}

export function validateWorkout({ nome, categoria, nivel, duracao, descricao, exercicios }) {
  const errors = {};
  if (isEmpty(nome)) errors.nome = 'validation.required';
  else if (nome.trim().length < 3) errors.nome = 'validation.nameMin';
  if (isEmpty(categoria)) errors.categoria = 'validation.select';
  if (isEmpty(nivel)) errors.nivel = 'validation.select';
  if (isEmpty(duracao)) errors.duracao = 'validation.required';
  else if (!isPositiveInteger(duracao)) errors.duracao = 'validation.integer';
  if (isEmpty(descricao)) errors.descricao = 'validation.required';
  if (!exercicios || exercicios.length === 0) errors.exercicios = 'validation.minExercises';
  else {
    const incomplete = exercicios.some(
      ({ nome: exNome, series, repeticoes }) =>
        isEmpty(exNome) || !isPositiveInteger(series) || !isPositiveInteger(repeticoes),
    );
    if (incomplete) errors.exercicios = 'validation.exerciseFields';
  }
  return errors;
}

export function validateClass(values) {
  const { modalidade, instrutor, dia, horario, duracao, vagas, inscritos, sala } = values;
  const errors = {};
  if (isEmpty(modalidade)) errors.modalidade = 'validation.select';
  if (isEmpty(instrutor)) errors.instrutor = 'validation.required';
  else if (instrutor.trim().length < 3) errors.instrutor = 'validation.nameMin';
  if (isEmpty(dia)) errors.dia = 'validation.select';
  if (isEmpty(horario)) errors.horario = 'validation.required';
  else if (!isTime(horario)) errors.horario = 'validation.time';
  if (isEmpty(duracao)) errors.duracao = 'validation.required';
  else if (!isPositiveInteger(duracao)) errors.duracao = 'validation.integer';
  if (isEmpty(vagas)) errors.vagas = 'validation.required';
  else if (!isPositiveInteger(vagas)) errors.vagas = 'validation.integer';
  if (isEmpty(inscritos)) errors.inscritos = 'validation.required';
  else if (!/^\d+$/.test(String(inscritos).trim())) errors.inscritos = 'validation.integer';
  else if (Number(inscritos) > Number(vagas)) errors.inscritos = 'validation.enrolledMax';
  if (isEmpty(sala)) errors.sala = 'validation.required';
  return errors;
}
