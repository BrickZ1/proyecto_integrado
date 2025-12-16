// Funciones helper para la aplicación

// Formatear fechas
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleDateString("es-CL", { ...defaultOptions, ...options });
};

// Formatear números
export const formatNumber = (number) => {
  return new Intl.NumberFormat("es-CL").format(number);
};

// Capitalizar texto
export const capitalize = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Validar email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validar password
export const validatePassword = (password) => {
  if (password.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres";
  }
  return null;
};

// Generar ID único
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Calcular porcentaje
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

// Obtener dificultad en español
export const getDifficultyLabel = (difficulty) => {
  const labels = {
    easy: "Fácil",
    medium: "Media",
    hard: "Difícil",
  };
  return labels[difficulty] || difficulty;
};

// Obtener categoría en español
export const getCategoryLabel = (category) => {
  const labels = {
    all: "Todas",
    history: "Historia",
    nature: "Naturaleza",
    culture: "Cultura",
    geography: "Geografía",
    rules: "Normativas",
    general: "General",
  };
  return labels[category] || category;
};

// Filtrar preguntas por categoría y dificultad
export const filterQuestions = (questions, category, difficulty) => {
  return questions.filter((question) => {
    const categoryMatch = category === "all" || question.category === category;
    const difficultyMatch =
      difficulty === "all" || question.difficulty === difficulty;
    return categoryMatch && difficultyMatch;
  });
};

// Mezclar array (para opciones de preguntas)
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Crear slug para URLs
export const createSlug = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

// Truncar texto
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

// Obtener color según puntaje
export const getScoreColor = (percentage) => {
  if (percentage >= 90) return "text-green-600 bg-green-100";
  if (percentage >= 70) return "text-blue-600 bg-blue-100";
  if (percentage >= 50) return "text-yellow-600 bg-yellow-100";
  return "text-red-600 bg-red-100";
};

// Obtener icono según categoría
export const getCategoryIcon = (category) => {
  const icons = {
    history: "🏛️",
    nature: "🌲",
    culture: "🎭",
    geography: "🗺️",
    rules: "📜",
    general: "❓",
  };
  return icons[category] || "❓";
};

// Validar datos de pregunta
export const validateQuestion = (questionData) => {
  const errors = [];

  if (!questionData.question || questionData.question.trim().length < 10) {
    errors.push("La pregunta debe tener al menos 10 caracteres");
  }

  if (questionData.options.length !== 4) {
    errors.push("Debe haber exactamente 4 opciones");
  }

  const emptyOptions = questionData.options.filter((opt) => !opt.trim());
  if (emptyOptions.length > 0) {
    errors.push("Todas las opciones deben estar completas");
  }

  if (
    typeof questionData.correctOption !== "number" ||
    questionData.correctOption < 0 ||
    questionData.correctOption > 3
  ) {
    errors.push("Debe seleccionar una opción correcta válida");
  }

  if (!questionData.category) {
    errors.push("Debe seleccionar una categoría");
  }

  if (!questionData.difficulty) {
    errors.push("Debe seleccionar una dificultad");
  }

  return errors;
};

// Exportar todas las funciones
export default {
  formatDate,
  formatNumber,
  capitalize,
  validateEmail,
  validatePassword,
  generateId,
  calculatePercentage,
  getDifficultyLabel,
  getCategoryLabel,
  filterQuestions,
  shuffleArray,
  createSlug,
  truncateText,
  getScoreColor,
  getCategoryIcon,
  validateQuestion,
};
