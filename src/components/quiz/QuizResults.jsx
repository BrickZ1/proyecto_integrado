import { Trophy, RefreshCw, Home } from "lucide-react";
import { useQuiz } from "../../context/QuizContext";
import { Link } from "react-router-dom";

const QuizResults = () => {
  const { score, questions, resetQuiz } = useQuiz();
  const percentage = Math.round((score / questions.length) * 100);

  const getResultMessage = () => {
    if (percentage >= 90)
      return "¡Excelente! Eres un experto del Museo Parque Angostura 🏆";
    if (percentage >= 70)
      return "¡Muy bien! Tienes buenos conocimientos del parque 👍";
    if (percentage >= 50)
      return "¡Buen trabajo! Sigue aprendiendo sobre el parque 📚";
    return "¡Sigue explorando el Museo Parque Angostura para aprender más! 🌲";
  };

  const getResultColor = () => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 70) return "text-blue-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="text-center py-8">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 mb-4">
          <Trophy className="h-10 w-10 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold mb-4">¡Quiz Completado!</h2>
        <p className="text-gray-600">{getResultMessage()}</p>
      </div>

      <div className="card max-w-md mx-auto mb-8">
        <div className="mb-6">
          <div className={`text-5xl font-bold mb-2 ${getResultColor()}`}>
            {percentage}%
          </div>
          <div className="text-gray-600">
            {score} de {questions.length} respuestas correctas
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Puntuación</span>
            <span className="font-medium">
              {score}/{questions.length}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Porcentaje</span>
            <span className="font-medium">{percentage}%</span>
          </div>
          <div className="flex justify-between">
            <span>Dificultad promedio</span>
            <span className="font-medium capitalize">
              {questions.length > 0
                ? questions.reduce(
                    (sum, q) =>
                      sum +
                      (q.difficulty === "easy"
                        ? 1
                        : q.difficulty === "medium"
                        ? 2
                        : 3),
                    0
                  ) /
                    questions.length >
                  2
                  ? "Alta"
                  : "Media"
                : "N/A"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={resetQuiz} className="btn-primary">
          <RefreshCw className="inline-block mr-2" size={20} />
          Intentar Nuevamente
        </button>

        <Link to="/" className="btn-secondary bg-gray-600 hover:bg-gray-700">
          <Home className="inline-block mr-2" size={20} />
          Volver al Inicio
        </Link>
      </div>

      <div className="mt-12 pt-8 border-t">
        <h3 className="font-semibold mb-4">¿Quieres aprender más?</h3>
        <p className="text-gray-600 mb-4">
          Visita el Museo Parque Angostura para descubrir todos sus atractivos
          naturales y patrimoniales.
        </p>
        <a
          href="https://angosturadelbiobio.cl/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary-600 hover:text-primary-800"
        >
          Ver sitio oficial del parque →
        </a>
      </div>
    </div>
  );
};

export default QuizResults;
