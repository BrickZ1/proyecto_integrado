import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const QUIZ_COLLECTION = "quiz_questions";
const RESULTS_COLLECTION = "quiz_results";

// Obtener todas las preguntas
export const getQuestions = async () => {
  try {
    const q = query(
      collection(db, QUIZ_COLLECTION),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting questions:", error);
    throw error;
  }
};

// Obtener preguntas por categoría
export const getQuestionsByCategory = async (category) => {
  try {
    const q = query(
      collection(db, QUIZ_COLLECTION),
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting questions by category:", error);
    throw error;
  }
};

// Obtener preguntas por dificultad
export const getQuestionsByDifficulty = async (difficulty) => {
  try {
    const q = query(
      collection(db, QUIZ_COLLECTION),
      where("difficulty", "==", difficulty),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting questions by difficulty:", error);
    throw error;
  }
};

// Obtener una pregunta por ID
export const getQuestion = async (id) => {
  try {
    if (!id) throw new Error("ID de pregunta requerido");

    const docRef = doc(db, QUIZ_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    }

    return null;
  } catch (error) {
    console.error("Error getting question:", error);
    throw error;
  }
};

// Crear nueva pregunta
export const createQuestion = async (questionData) => {
  try {
    // Validar datos básicos
    if (!questionData.question || questionData.question.trim().length < 5) {
      throw new Error("La pregunta debe tener al menos 5 caracteres");
    }

    if (!questionData.options || questionData.options.length !== 4) {
      throw new Error("Debe haber exactamente 4 opciones");
    }

    const hasEmptyOption = questionData.options.some(
      (opt) => !opt || opt.trim() === ""
    );
    if (hasEmptyOption) {
      throw new Error("Todas las opciones deben tener contenido");
    }

    if (
      typeof questionData.correctOption !== "number" ||
      questionData.correctOption < 0 ||
      questionData.correctOption > 3
    ) {
      throw new Error("Opción correcta inválida");
    }

    const questionWithMetadata = {
      ...questionData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      active: questionData.active !== false,
    };

    const docRef = await addDoc(
      collection(db, QUIZ_COLLECTION),
      questionWithMetadata
    );

    return {
      success: true,
      id: docRef.id,
      ...questionWithMetadata,
    };
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
};

// Actualizar pregunta
export const updateQuestion = async (id, questionData) => {
  try {
    if (!id) throw new Error("ID de pregunta requerido");

    const docRef = doc(db, QUIZ_COLLECTION, id);

    // Verificar que existe
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("La pregunta no existe");
    }

    const updateData = {
      ...questionData,
      updatedAt: new Date().toISOString(),
    };

    // Remover campos que no deben actualizarse
    delete updateData.id;
    delete updateData.createdAt;

    await updateDoc(docRef, updateData);

    return {
      success: true,
      id,
      ...updateData,
    };
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};

// Eliminar pregunta
export const deleteQuestion = async (id) => {
  try {
    if (!id) throw new Error("ID de pregunta requerido");

    await deleteDoc(doc(db, QUIZ_COLLECTION, id));

    return { success: true, id };
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};

// Toggle estado activo/inactivo de pregunta
export const toggleQuestionStatus = async (id, isActive) => {
  try {
    const docRef = doc(db, QUIZ_COLLECTION, id);
    await updateDoc(docRef, {
      active: isActive,
      updatedAt: new Date().toISOString(),
    });

    return { success: true, id, active: isActive };
  } catch (error) {
    console.error("Error toggling question status:", error);
    throw error;
  }
};

// Obtener preguntas aleatorias para el quiz
export const getRandomQuestions = async (count = 10) => {
  try {
    const allQuestions = await getQuestions();

    // Filtrar solo preguntas activas
    const activeQuestions = allQuestions.filter((q) => q.active !== false);

    // Mezclar array
    const shuffled = [...activeQuestions].sort(() => Math.random() - 0.5);

    // Tomar las primeras 'count' preguntas
    return shuffled.slice(0, Math.min(count, shuffled.length));
  } catch (error) {
    console.error("Error getting random questions:", error);
    throw error;
  }
};

// Enviar resultados del quiz
export const submitQuizResult = async (resultData) => {
  try {
    // Validar datos básicos
    if (
      typeof resultData.score !== "number" ||
      typeof resultData.totalQuestions !== "number"
    ) {
      throw new Error("Datos de resultado inválidos");
    }

    const resultWithMetadata = {
      ...resultData,
      submittedAt: new Date().toISOString(),
      timestamp: serverTimestamp(),
    };

    const docRef = await addDoc(
      collection(db, RESULTS_COLLECTION),
      resultWithMetadata
    );

    return {
      success: true,
      id: docRef.id,
      ...resultWithMetadata,
    };
  } catch (error) {
    console.error("Error submitting quiz result:", error);
    throw error;
  }
};

// Obtener estadísticas del quiz
export const getQuizStats = async () => {
  try {
    // Obtener todos los resultados
    const resultsQuery = query(
      collection(db, RESULTS_COLLECTION),
      orderBy("submittedAt", "desc")
    );

    const resultsSnapshot = await getDocs(resultsQuery);
    const results = resultsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Obtener todas las preguntas
    const questions = await getQuestions();

    // Calcular estadísticas
    const totalQuizzes = results.length;

    let totalScore = 0;
    let totalTime = 0;

    results.forEach((result) => {
      totalScore += result.score;
      if (result.timeSpent) {
        totalTime += result.timeSpent;
      }
    });

    const averageScore = totalQuizzes > 0 ? totalScore / totalQuizzes : 0;
    const averagePercentage =
      totalQuizzes > 0
        ? (averageScore / results[0]?.totalQuestions || 1) * 100
        : 0;
    const averageTime = totalQuizzes > 0 ? totalTime / totalQuizzes : 0;

    // Estadísticas por categoría de pregunta
    const categoryStats = {};
    questions.forEach((question) => {
      if (!categoryStats[question.category]) {
        categoryStats[question.category] = {
          count: 0,
          easy: 0,
          medium: 0,
          hard: 0,
        };
      }

      categoryStats[question.category].count++;
      if (question.difficulty) {
        categoryStats[question.category][question.difficulty]++;
      }
    });

    return {
      totalQuizzes,
      totalQuestions: questions.length,
      activeQuestions: questions.filter((q) => q.active !== false).length,
      averageScore: Math.round(averageScore * 10) / 10,
      averagePercentage: Math.round(averagePercentage),
      averageTime: Math.round(averageTime),
      categoryStats,
      recentResults: results.slice(0, 10),
    };
  } catch (error) {
    console.error("Error getting quiz stats:", error);
    throw error;
  }
};

// Obtener resultados recientes
export const getRecentResults = async (limitCount = 20) => {
  try {
    const q = query(
      collection(db, RESULTS_COLLECTION),
      orderBy("submittedAt", "desc"),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting recent results:", error);
    throw error;
  }
};

// Buscar preguntas
export const searchQuestions = async (searchTerm) => {
  try {
    const allQuestions = await getQuestions();

    return allQuestions.filter(
      (question) =>
        question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (question.explanation &&
          question.explanation.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  } catch (error) {
    console.error("Error searching questions:", error);
    throw error;
  }
};
