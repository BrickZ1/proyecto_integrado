import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// Exportar funciones de Firestore
import { 
  collection, doc, getDocs, getDoc, addDoc, 
  updateDoc, deleteDoc, query, where, orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

// Configuración de Firebase - REEMPLAZA CON TUS DATOS
const firebaseConfig = {
  apiKey: "AIzaSyA1cF8M1lJiT3BVoyw7DMKjUeCs1h3R2s4",
  authDomain: "proyecto-angostura-43019.firebaseapp.com",
  projectId: "proyecto-angostura-43019",
  storageBucket: "proyecto-angostura-43019.firebasestorage.app",
  messagingSenderId: "680141481920",
  appId: "1:680141481920:web:18a307dd77ad356cc98a25"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };


export { 
  collection, doc, getDocs, getDoc, addDoc, 
  updateDoc, deleteDoc, query, where, orderBy, 
  serverTimestamp 
};