import { 
  db, auth, collection, doc, getDocs, getDoc, 
  addDoc, updateDoc, deleteDoc, query, where, 
  orderBy, serverTimestamp 
} from '../firebase/config';
import { 
  signInWithEmailAndPassword, signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

// ==================== FUNCIONES DE AUTENTICACIÓN ====================

export const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    let errorMessage = 'Error al iniciar sesión';
    switch (error.code) {
      case 'auth/user-not-found': errorMessage = 'Usuario no encontrado'; break;
      case 'auth/wrong-password': errorMessage = 'Contraseña incorrecta'; break;
      case 'auth/invalid-email': errorMessage = 'Email inválido'; break;
      default: errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
};

export const logoutAdmin = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const checkAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

// ==================== FUNCIONES DE PREGUNTAS ====================

const preguntasRef = collection(db, 'preguntas');

export const getAllQuestions = async () => {
  try {
    const q = query(preguntasRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const questions = [];
    querySnapshot.forEach((doc) => {
      questions.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: questions };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getActiveQuestions = async () => {
  try {
    const q = query(
      preguntasRef, 
      where('active', '==', true),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const questions = [];
    querySnapshot.forEach((doc) => {
      questions.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: questions };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createQuestion = async (questionData) => {
  try {
    if (!questionData.question || !questionData.options || questionData.options.length !== 4) {
      return { success: false, error: 'Datos incompletos' };
    }
    
    const questionWithMetadata = {
      ...questionData,
      active: questionData.active !== undefined ? questionData.active : true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      views: 0,
      correctAnswers: 0,
      totalAttempts: 0
    };
    
    const docRef = await addDoc(preguntasRef, questionWithMetadata);
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateQuestion = async (id, updatedData) => {
  try {
    const docRef = doc(db, 'preguntas', id);
    await updateDoc(docRef, {
      ...updatedData,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteQuestion = async (id) => {
  try {
    const docRef = doc(db, 'preguntas', id);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateQuestionStats = async (id, wasCorrect) => {
  try {
    const docRef = doc(db, 'preguntas', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      const newStats = {
        totalAttempts: (data.totalAttempts || 0) + 1,
        correctAnswers: (data.correctAnswers || 0) + (wasCorrect ? 1 : 0),
        updatedAt: serverTimestamp()
      };
      await updateDoc(docRef, newStats);
      return { success: true };
    }
    return { success: false, error: 'Pregunta no encontrada' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getQuizStats = async () => {
  try {
    const querySnapshot = await getDocs(preguntasRef);
    
    let totalQuestions = 0;
    let activeQuestions = 0;
    let totalAttempts = 0;
    let correctAnswers = 0;
    const byCategory = {};
    const byDifficulty = {};
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      totalQuestions++;
      if (data.active) activeQuestions++;
      if (data.totalAttempts) totalAttempts += data.totalAttempts;
      if (data.correctAnswers) correctAnswers += data.correctAnswers;
      
      const category = data.category || 'general';
      byCategory[category] = (byCategory[category] || 0) + 1;
      
      const difficulty = data.difficulty || 'medio';
      byDifficulty[difficulty] = (byDifficulty[difficulty] || 0) + 1;
    });
    
    const accuracy = totalAttempts > 0 ? (correctAnswers / totalAttempts) * 100 : 0;
    
    return {
      success: true,
      data: {
        totalQuestions,
        activeQuestions,
        totalAttempts,
        correctAnswers,
        accuracy: Math.round(accuracy),
        byCategory,
        byDifficulty
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ==================== FUNCIONES DE RESULTADOS ====================

const resultadosRef = collection(db, 'resultados');

export const saveQuizResult = async (resultData) => {
  try {
    const resultWithMetadata = {
      ...resultData,
      createdAt: serverTimestamp(),
      date: new Date().toISOString()
    };
    const docRef = await addDoc(resultadosRef, resultWithMetadata);
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getLeaderboard = async (limit = 10) => {
  try {
    const q = query(
      resultadosRef, 
      orderBy('score', 'desc'),
      orderBy('timeSpent', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: results.slice(0, limit) };
  } catch (error) {
    return { success: false, error: error.message };
  }
};