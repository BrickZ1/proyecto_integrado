import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

// Configuración de Firebase - REEMPLAZA CON TUS DATOS REALES
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Validar configuración
const validateConfig = () => {
  const required = [
    "apiKey",
    "authDomain",
    "projectId",
    "storageBucket",
    "messagingSenderId",
    "appId",
  ];
  const missing = required.filter((key) => !firebaseConfig[key]);

  if (missing.length > 0) {
    console.error("❌ Configuración de Firebase incompleta. Faltan:", missing);
    console.error(
      "Por favor, configura las variables de entorno en .env.local"
    );
    return false;
  }

  console.log("✅ Configuración de Firebase válida");
  return true;
};

// Inicializar Firebase
let app;
let auth;
let db;
let storage;
let functions;

try {
  app = initializeApp(firebaseConfig);

  // Inicializar servicios
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  functions = getFunctions(app);

  // Configurar persistencia de autenticación
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log("✅ Persistencia de autenticación configurada");
    })
    .catch((error) => {
      console.error("❌ Error configurando persistencia:", error);
    });

  // Habilitar persistencia offline de Firestore
  enableIndexedDbPersistence(db)
    .then(() => {
      console.log("✅ Persistencia offline de Firestore habilitada");
    })
    .catch((err) => {
      if (err.code === "failed-precondition") {
        console.warn(
          "⚠️ Persistencia offline no disponible (múltiples pestañas abiertas)"
        );
      } else if (err.code === "unimplemented") {
        console.warn("⚠️ El navegador no soporta persistencia offline");
      }
    });

  console.log("✅ Firebase inicializado correctamente");
} catch (error) {
  console.error("❌ Error inicializando Firebase:", error);
  console.error("Por favor, verifica tu configuración en .env.local");

  // Configuración de respaldo para desarrollo
  if (process.env.NODE_ENV === "development") {
    console.warn("⚠️ Usando configuración de respaldo para desarrollo");

    const backupConfig = {
      apiKey: "AIzaSyAuY7XAswtYkzv3KELVdqjzLUuXvLS3_8A",
      authDomain: "museo-parque-angostura.firebaseapp.com",
      projectId: "museo-parque-angostura",
      storageBucket: "museo-parque-angostura.firebasestorage.app",
      messagingSenderId: "651733082868",
      appId: "1:651733082868:web:401be95688b1f2663cb4a1",
    };

    app = initializeApp(backupConfig, "BackupApp");
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    functions = getFunctions(app);
  }
}

// Exportar servicios
export { app, auth, db, storage, functions };
export default app;
