import { useQuiz } from "../context/QuizContext";
import QuizStart from "../components/quiz/QuizStart";
import QuizQuestion from "../components/quiz/QuizQuestion";
import QuizResults from "../components/quiz/QuizResults";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const QuizPage = () => {
  const { quizStarted, quizCompleted, loading } = useQuiz();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <h1 className="text-3xl font-bold mb-6 text-primary-700">
          Quiz sobre Museo Parque Angostura
        </h1>

        {!quizStarted && !quizCompleted && <QuizStart />}
        {quizStarted && !quizCompleted && <QuizQuestion />}
        {quizCompleted && <QuizResults />}
      </div>
    </div>
  );
};

export default QuizPage;
