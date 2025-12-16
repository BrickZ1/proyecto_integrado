import { PlayCircle } from "lucide-react";
import { useQuiz } from "../../context/QuizContext";

const QuizStart = () => {
  const { questions, startQuiz } = useQuiz();

  return (
    <div className="text-center py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Test Your Knowledge</h2>
        <p className="text-gray-600 mb-2">
          Pon a prueba tus conocimientos sobre el Museo Parque Angostura
        </p>
        <p className="text-gray-500">
          {questions.length} preguntas sobre historia, naturaleza y cultura
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="text-3xl mb-2">❓</div>
          <h3 className="font-semibold mb-2">Preguntas Variadas</h3>
          <p className="text-sm text-gray-600">
            Historia, naturaleza y cultura del parque
          </p>
        </div>

        <div className="card">
          <div className="text-3xl mb-2">⏱️</div>
          <h3 className="font-semibold mb-2">Sin Límite de Tiempo</h3>
          <p className="text-sm text-gray-600">
            Tómate tu tiempo para responder
          </p>
        </div>

        <div className="card">
          <div className="text-3xl mb-2">🏆</div>
          <h3 className="font-semibold mb-2">Obtén tu Puntaje</h3>
          <p className="text-sm text-gray-600">
            Compara tus resultados al final
          </p>
        </div>
      </div>

      <button onClick={startQuiz} className="btn-primary text-lg px-8 py-3">
        <PlayCircle className="inline-block mr-2" size={24} />
        Comenzar Quiz
      </button>
    </div>
  );
};

export default QuizStart;
