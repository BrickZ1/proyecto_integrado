// Configuración de la aplicación
export const APP_CONFIG = {
  NAME: "Museo Parque Angostura",
  DESCRIPTION:
    "Sitio web informativo y quiz interactivo sobre el Museo Parque Angostura en la Región del Biobío, Chile",
  VERSION: "1.0.0",
  AUTHOR: "Museo Parque Angostura",
  YEAR: new Date().getFullYear(),
};

// URLs importantes
export const URLS = {
  OFFICIAL: "https://angosturadelbiobio.cl/",
  FACEBOOK: "https://facebook.com/angosturadelbiobio",
  INSTAGRAM: "https://instagram.com/angosturadelbiobio",
  YOUTUBE: "https://youtube.com/@angosturadelbiobio",
  GOOGLE_MAPS: "https://maps.google.com/?q=Angostura+del+Biobío+Chile",
};

// Rutas de la aplicación
export const ROUTES = {
  HOME: "/",
  QUIZ: "/quiz",
  QUIZ_START: "/quiz/start",
  QUIZ_RESULTS: "/quiz/results",
  ADMIN: "/admin",
  ADMIN_LOGIN: "/admin/login",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_USERS: "/admin/users",
  ADMIN_QUESTIONS: "/admin/questions",
  ADMIN_STATS: "/admin/stats",
  NOT_FOUND: "*",
};

// Configuración del Quiz
export const QUIZ_CONFIG = {
  QUESTIONS_PER_QUIZ: 10,
  TIME_LIMIT: 600, // 10 minutos en segundos
  PASSING_SCORE: 70, // Porcentaje mínimo para aprobar
  MAX_ATTEMPTS: 3, // Máximo de intentos por día
  QUESTION_CATEGORIES: [
    { id: "all", name: "Todas las categorías", color: "gray" },
    { id: "history", name: "Historia", color: "blue", icon: "🏛️" },
    { id: "nature", name: "Naturaleza", color: "green", icon: "🌲" },
    { id: "culture", name: "Cultura", color: "purple", icon: "🎭" },
    { id: "geography", name: "Geografía", color: "orange", icon: "🗺️" },
    { id: "fauna", name: "Fauna", color: "teal", icon: "🦉" },
    { id: "flora", name: "Flora", color: "emerald", icon: "🌺" },
  ],
  DIFFICULTY_LEVELS: [
    { id: "all", name: "Todas", color: "gray" },
    { id: "easy", name: "Fácil", color: "green", points: 1 },
    { id: "medium", name: "Media", color: "yellow", points: 2 },
    { id: "hard", name: "Difícil", color: "red", points: 3 },
  ],
  SCORE_THRESHOLDS: {
    EXCELLENT: 90, // 🏆
    GOOD: 70, // 👍
    AVERAGE: 50, // ✅
    POOR: 0, // 📚
  },
};

// Configuración de Administración
export const ADMIN_CONFIG = {
  ROLES: [
    {
      id: "admin",
      name: "Administrador",
      level: 3,
      description: "Acceso completo a todas las funciones",
      permissions: ["all"],
    },
    {
      id: "editor",
      name: "Editor",
      level: 2,
      description: "Puede crear y editar contenido",
      permissions: ["read", "create", "update", "publish"],
    },
    {
      id: "viewer",
      name: "Solo lectura",
      level: 1,
      description: "Solo puede ver contenido",
      permissions: ["read"],
    },
  ],
  PERMISSIONS: {
    // Usuarios
    USER_VIEW: "user:view",
    USER_CREATE: "user:create",
    USER_EDIT: "user:edit",
    USER_DELETE: "user:delete",

    // Preguntas
    QUESTION_VIEW: "question:view",
    QUESTION_CREATE: "question:create",
    QUESTION_EDIT: "question:edit",
    QUESTION_DELETE: "question:delete",

    // Contenido
    CONTENT_VIEW: "content:view",
    CONTENT_CREATE: "content:create",
    CONTENT_EDIT: "content:edit",
    CONTENT_PUBLISH: "content:publish",

    // Estadísticas
    STATS_VIEW: "stats:view",
    STATS_EXPORT: "stats:export",

    // Sistema
    SETTINGS_VIEW: "settings:view",
    SETTINGS_EDIT: "settings:edit",
  },
};

// Colores de la aplicación
export const COLORS = {
  PRIMARY: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },
  SECONDARY: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },
  ACCENT: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
  },
  NEUTRAL: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
};

// Mensajes de la aplicación
export const MESSAGES = {
  // Éxito
  SUCCESS: {
    LOGIN: "Inicio de sesión exitoso",
    LOGOUT: "Sesión cerrada correctamente",
    SAVE: "Cambios guardados exitosamente",
    DELETE: "Eliminado correctamente",
    CREATE: "Creado exitosamente",
    UPDATE: "Actualizado correctamente",
  },

  // Error
  ERROR: {
    LOGIN: "Error al iniciar sesión",
    LOGOUT: "Error al cerrar sesión",
    SAVE: "Error al guardar cambios",
    DELETE: "Error al eliminar",
    CREATE: "Error al crear",
    UPDATE: "Error al actualizar",
    NETWORK: "Error de conexión. Verifica tu internet",
    PERMISSION: "No tienes permisos para realizar esta acción",
    NOT_FOUND: "Recurso no encontrado",
    VALIDATION: "Por favor, completa todos los campos correctamente",
  },

  // Información
  INFO: {
    WELCOME: "¡Bienvenido al Museo Parque Angostura!",
    QUIZ_START: "¡Prepárate para el quiz!",
    QUIZ_COMPLETE: "¡Quiz completado! Revisa tus resultados.",
    NO_DATA: "No hay datos para mostrar",
  },

  // Advertencias
  WARNING: {
    UNSAVED: "Tienes cambios sin guardar",
    DELETE_CONFIRM: "¿Estás seguro de eliminar este elemento?",
    LEAVE_CONFIRM: "Hay cambios sin guardar. ¿Seguro que quieres salir?",
  },
};

// Preguntas de ejemplo para inicializar
export const SAMPLE_QUESTIONS = [
  {
    question: "¿En qué región de Chile se encuentra el Museo Parque Angostura?",
    options: [
      "Región del Maule",
      "Región del Biobío",
      "Región de Los Lagos",
      "Región de Valparaíso",
    ],
    correctOption: 1,
    category: "geography",
    difficulty: "easy",
    explanation:
      "El Museo Parque Angostura se encuentra en la Región del Biobío, específicamente en la Provincia de Ñuble.",
  },
  {
    question: "¿Cuál es el principal río que atraviesa el Parque Angostura?",
    options: ["Río Maule", "Río Biobío", "Río Itata", "Río Ñuble"],
    correctOption: 1,
    category: "geography",
    difficulty: "medium",
    explanation:
      "El Río Biobío es el principal curso de agua que atraviesa el parque y da nombre a la región.",
  },
  {
    question: "¿Qué tipo de bosque predomina en el Parque Angostura?",
    options: [
      "Bosque esclerófilo",
      "Bosque caducifolio",
      "Bosque siempreverde",
      "Matorral desértico",
    ],
    correctOption: 2,
    category: "nature",
    difficulty: "medium",
    explanation:
      "El parque se caracteriza por su bosque siempreverde, típico de la zona centro-sur de Chile.",
  },
  {
    question: "¿En qué año fue inaugurado oficialmente el museo del parque?",
    options: ["1998", "2005", "2010", "2015"],
    correctOption: 1,
    category: "history",
    difficulty: "hard",
    explanation:
      "El Museo Parque Angostura fue inaugurado en el año 2005, aunque el parque ya existía desde antes como área protegida.",
  },
  {
    question: "¿Qué actividad está estrictamente prohibida dentro del parque?",
    options: ["Senderismo", "Fotografía", "Caza", "Observación de aves"],
    correctOption: 2,
    category: "rules",
    difficulty: "easy",
    explanation:
      "La caza está completamente prohibida para proteger la fauna nativa del parque.",
  },
];

// Información de contacto
export const CONTACT_INFO = {
  ADDRESS: "Región del Biobío, Provincia de Ñuble, Chile",
  PHONE: "+56 9 1234 5678",
  EMAIL: "info@angosturadelbiobio.cl",
  BUSINESS_HOURS: {
    weekdays: "09:00 - 18:00",
    weekends: "10:00 - 16:00",
    holidays: "Cerrado",
  },
};

export default {
  APP_CONFIG,
  URLS,
  ROUTES,
  QUIZ_CONFIG,
  ADMIN_CONFIG,
  COLORS,
  MESSAGES,
  SAMPLE_QUESTIONS,
  CONTACT_INFO,
};
