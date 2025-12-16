import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { useQuiz } from "../../context/QuizContext";

const QuizQuestion = () => {
  const { questions, currentQuestion, answerQuestion } = useQuiz();
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);

  const question = questions[currentQuestion];

  if (!question) {
    return <div>No hay preguntas disponibles</div>;
  }

  const handleAnswer = (optionIndex) => {
    if (answered) return;

    setSelectedOption(optionIndex);
    setAnswered(true);

    const isCorrect = optionIndex === question.correctOption;

    setTimeout(() => {
      answerQuestion({
        questionId: question.id,
        optionIndex,
        isCorrect,
      });
      setSelectedOption(null);
      setAnswered(false);
    }, 1500);
  };

  const getOptionStyle = (index) => {
    if (!answered) {
      return "hover:bg-gray-50 cursor-pointer";
    }

    if (index === question.correctOption) {
      return "bg-green-100 border-green-500";
    }

    if (index === selectedOption && index !== question.correctOption) {
      return "bg-red-100 border-red-500";
    }

    return "bg-gray-100";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-primary-600">
          Pregunta {currentQuestion + 1} de {questions.length}
        </span>
        <span className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100">
          {question.category}
        </span>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
        <div className="text-sm text-gray-500">
          Dificultad:{" "}
          <span className="font-medium capitalize">{question.difficulty}</span>
        </div>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={answered}
            className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${getOptionStyle(
              index
            )}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span>{option}</span>
              </div>

              {answered && index === question.correctOption && (
                <CheckCircle className="text-green-500" size={20} />
              )}

              {answered &&
                index === selectedOption &&
                index !== question.correctOption && (
                  <XCircle className="text-red-500" size={20} />
                )}
            </div>
          </button>
        ))}
      </div>

      {answered && (
        <div className="mt-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
          <p className="text-blue-800">
            {selectedOption === question.correctOption
              ? "¡Correcto! Excelente respuesta."
              : `Respuesta correcta: ${
                  question.options[question.correctOption]
                }`}
          </p>
        </div>
      )}

      <div className="mt-6 pt-6 border-t">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Progreso</span>
          <span>
            {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
          <div
            className="h-full bg-primary-600 transition-all duration-300"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
