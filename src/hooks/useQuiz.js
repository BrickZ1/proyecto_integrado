import { useState, useEffect, useCallback } from "react";
import { getQuestions, submitQuizResult } from "../services/quizService";

export const useQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Cargar preguntas
  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getQuestions();
        setQuestions(data);
      } catch (err) {
        setError(
          "Error al cargar las preguntas. Por favor, intenta nuevamente."
        );
        console.error("Error loading questions:", err);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  // Timer para el quiz
  useEffect(() => {
    let interval;

    if (timerActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);

  const startQuiz = useCallback(() => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setQuizCompleted(false);
    setTimer(0);
    setTimerActive(true);
  }, []);

  const answerQuestion = useCallback(
    async (answerData) => {
      const newAnswers = [...answers, answerData];
      setAnswers(newAnswers);

      if (answerData.isCorrect) {
        setScore((prev) => prev + 1);
      }

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        await completeQuiz(newAnswers);
      }
    },
    [answers, currentQuestionIndex, questions.length]
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
    } catch (err) {
      console.error("Error saving quiz result:", err);
      // Aún mostramos resultados aunque falle guardar
      setQuizCompleted(true);
    }
  };

  const resetQuiz = useCallback(() => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setTimer(0);
    setTimerActive(false);
    setError(null);
  }, []);

  const skipQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAnswers((prev) => [
        ...prev,
        {
          questionId: questions[currentQuestionIndex].id,
          skipped: true,
        },
      ]);
    }
  }, [currentQuestionIndex, questions]);

  const formatTime = useCallback((seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  return {
    // Estado
    questions,
    currentQuestion,
    currentQuestionIndex,
    answers,
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

    // Utilidades
    totalQuestions: questions.length,
    progressPercentage:
      questions.length > 0
        ? ((currentQuestionIndex + 1) / questions.length) * 100
        : 0,
    correctAnswers: answers.filter((a) => a.isCorrect).length,
    incorrectAnswers: answers.filter((a) => a.isCorrect === false).length,
  };
};
