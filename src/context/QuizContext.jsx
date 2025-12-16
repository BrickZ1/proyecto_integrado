import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getQuestions, submitQuizResult } from "../services/quizService";
import toast from "react-hot-toast";

const QuizContext = createContext();

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz debe ser usado dentro de QuizProvider");
  }
  return context;
};

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  // Timer effect
  useEffect(() => {
    let interval;

    if (timerActive && quizStarted && !quizCompleted) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, quizStarted, quizCompleted]);

  const loadQuestions = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getQuestions();
      setQuestions(data);
    } catch (error) {
      setError("Error al cargar las preguntas. Por favor, intenta nuevamente.");
      toast.error("Error cargando preguntas");
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = useCallback(() => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
    setQuizCompleted(false);
    setTimer(0);
    setTimerActive(true);
    setError(null);
  }, []);

  const answerQuestion = useCallback(
    async (answer) => {
      const newAnswers = [
        ...userAnswers,
        {
          ...answer,
          questionIndex: currentQuestion,
          timestamp: new Date().toISOString(),
        },
      ];

      setUserAnswers(newAnswers);

      if (answer.isCorrect) {
        setScore((prev) => prev + 1);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        await completeQuiz(newAnswers);
      }
    },
    [currentQuestion, userAnswers, questions.length]
  );

  const completeQuiz = async (finalAnswers) => {
    setTimerActive(false);

    try {
      await submitQuizResult({
        score,
        totalQuestions: questions.length,
        answers: finalAnswers,
        timeSpent: timer,
        completedAt: new Date().toISOString(),
      });

      setQuizCompleted(true);
      toast.success("¡Quiz completado! Revisa tus resultados.");
    } catch (error) {
      console.error("Error guardando resultados:", error);
      // Aún mostramos resultados aunque falle guardar
      setQuizCompleted(true);
      toast.success("¡Quiz completado! (Los resultados no se guardaron)");
    }
  };

  const resetQuiz = useCallback(() => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
    setTimer(0);
    setTimerActive(false);
    setError(null);
  }, []);

  const skipQuestion = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setUserAnswers((prev) => [
        ...prev,
        {
          questionIndex: currentQuestion,
          skipped: true,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  }, [currentQuestion, questions.length]);

  const formatTime = useCallback((seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }, []);

  const value = {
    // Estado
    questions,
    currentQuestion,
    currentQuestionIndex: currentQuestion,
    userAnswers,
    score,
    quizStarted,
    quizCompleted,
    loading,
    error,
    timer,
    timerActive,
    formatTime,

    // Acciones
    startQuiz,
    answerQuestion,
    resetQuiz,
    skipQuestion,
    loadQuestions,

    // Utilidades
    totalQuestions: questions.length,
    progressPercentage:
      questions.length > 0
        ? ((currentQuestion + 1) / questions.length) * 100
        : 0,
    correctAnswers: userAnswers.filter((a) => a.isCorrect).length,
    incorrectAnswers: userAnswers.filter((a) => a.isCorrect === false).length,
    skippedAnswers: userAnswers.filter((a) => a.skipped).length,

    // Pregunta actual
    currentQuestionData: questions[currentQuestion] || null,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
