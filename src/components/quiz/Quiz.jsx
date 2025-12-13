import { useState, useEffect } from 'react';
import { 
  getActiveQuestions, 
  updateQuestionStats,
  saveQuizResult 
} from '../../services/firebaseService';
import { 
  Trophy, Clock, AlertCircle, CheckCircle, XCircle,
  Zap, Leaf, Users, MapPin 
} from 'lucide-react';

export default function QuizEnergetico() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResults && selectedAnswer === null) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quizStarted) {
      handleNextQuestion();
    }
  }, [timeLeft, showResults, selectedAnswer, quizStarted]);

  const loadQuestions = async () => {
    setLoading(true);
    setError('');
    
    const result = await getActiveQuestions();
    
    if (result.success && result.data.length > 0) {
      const shuffled = [...result.data]
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(10, result.data.length));
      setQuestions(shuffled);
    } else if (result.error) {
      setError(result.error);
    } else {
      setError('No hay preguntas disponibles. El administrador debe agregar preguntas primero.');
    }
    
    setLoading(false);
  };

  const handleStartQuiz = () => {
    if (!playerName.trim()) {
      alert('Por favor ingresa tu nombre para comenzar');
      return;
    }
    setQuizStarted(true);
    setTimeLeft(30);
  };

  const handleAnswer = async (answerIndex) => {
    if (selectedAnswer !== null || !quizStarted) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    const questionId = questions[currentQuestion].id;
    
    // Actualizar estadísticas
    await updateQuestionStats(questionId, isCorrect);
    
    // Guardar respuesta
    const newAnswer = {
      questionId,
      selected: answerIndex,
      isCorrect,
      timeSpent: 30 - timeLeft
    };
    
    setUserAnswers([...userAnswers, newAnswer]);
    
    if (isCorrect) {
      const timeBonus = Math.floor(timeLeft / 3);
      setScore(score + 20 + timeBonus);
    }
    
    setTimeout(() => {
      handleNextQuestion();
    }, 1500);
  };

  const handleNextQuestion = async () => {
    setSelectedAnswer(null);
    setTimeLeft(30);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Guardar resultado
      const resultData = {
        playerName: playerName.trim(),
        score,
        totalQuestions: questions.length,
        correctAnswers: userAnswers.filter(a => a.isCorrect).length,
        timeSpent: userAnswers.reduce((total, answer) => total + answer.timeSpent, 0),
        date: new Date().toISOString()
      };
      
      await saveQuizResult(resultData);
      setShowResults(true);
    }
  };

  const restartQuiz = async () => {
    await loadQuestions();
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setTimeLeft(30);
    setQuizStarted(false);
    setUserAnswers([]);
    setPlayerName('');
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-biobio-blue mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Cargando quiz...</h2>
        <p className="text-gray-600">Preparando las preguntas desde la base de datos</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <AlertCircle className="mx-auto text-yellow-500 mb-4" size={48} />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No hay preguntas disponibles</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={loadQuestions}
          className="bg-biobio-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700"
        >
          Intentar nuevamente
        </button>
        <div className="mt-4 text-sm text-gray-500">
          <p>¿Eres administrador? <a href="/admin/login" className="text-blue-600 hover:underline">Inicia sesión para agregar preguntas</a></p>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-biobio-blue to-biobio-green rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Parque Angostura</h2>
          <p className="text-gray-600 mb-6">
            Pon a prueba tu conocimiento sobre energía renovable y turismo sustentable
          </p>
        </div>
        
        {/* Nombre del jugador */}
        <div className="mb-8">
          <label className="block text-gray-700 mb-2 font-medium">Tu nombre</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-biobio-blue focus:border-transparent"
            placeholder="Ingresa tu nombre para comenzar"
            maxLength={30}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
            <div className="text-sm text-gray-600">Preguntas</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">30s</div>
            <div className="text-sm text-gray-600">Por pregunta</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{questions.length * 20}</div>
            <div className="text-sm text-gray-600">Puntos máx</div>
          </div>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={handleStartQuiz}
            disabled={!playerName.trim()}
            className={`w-full py-4 rounded-lg font-bold text-lg ${
              playerName.trim()
                ? 'bg-gradient-to-r from-biobio-blue to-biobio-green text-white hover:opacity-90'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Comenzar Quiz
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
    const accuracy = (correctAnswers / questions.length) * 100;

    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Trophy className="mx-auto text-biobio-gold mb-4" size={48} />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">¡Quiz Completado, {playerName}!</h2>
          <p className="text-gray-600 mb-6">
            Has completado el quiz del Parque Angostura
          </p>
        </div>
        
        <div className="text-center mb-8">
          <div className="text-5xl font-bold text-biobio-blue mb-2">{score}</div>
          <div className="text-gray-600">puntos obtenidos</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">
              {correctAnswers}/{questions.length}
            </div>
            <div className="text-sm text-gray-600">Correctas</div>
          </div>
          <div className="bg-green-50 p-4 rounded-xl">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(accuracy)}%
            </div>
            <div className="text-sm text-gray-600">Precisión</div>
          </div>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={restartQuiz}
            className="w-full bg-gradient-to-r from-biobio-blue to-biobio-green text-white py-3 rounded-lg font-bold hover:opacity-90"
          >
            Jugar otra vez
          </button>
          <a
            href="/"
            className="block w-full text-center border border-gray-300 py-3 rounded-lg font-bold hover:bg-gray-50"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {/* Progreso y temporizador */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700">
            Pregunta {currentQuestion + 1} de {questions.length}
          </span>
          <div className="flex items-center gap-2">
            <Clock className="text-biobio-blue" size={20} />
            <span className="font-bold text-biobio-blue">{timeLeft}s</span>
          </div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-gradient-to-r from-biobio-blue to-biobio-green rounded-full transition-all duration-1000"
            style={{ width: `${(timeLeft / 30) * 100}%` }}
          />
        </div>
      </div>

      {/* Información de la pregunta */}
      <div className="mb-6">
        <div className="flex gap-2 mb-4">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            {currentQ.category || 'General'}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
            currentQ.difficulty === 'facil' ? 'bg-green-100 text-green-700' :
            currentQ.difficulty === 'medio' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {currentQ.difficulty || 'Medio'}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-6 leading-relaxed">
          {currentQ.question}
        </h3>
      </div>

      {/* Opciones de respuesta */}
      <div className="space-y-3 mb-8">
        {currentQ.options.map((option, index) => {
          let bgColor = "bg-white";
          let borderColor = "border-gray-200";
          let textColor = "text-gray-700";
          
          if (selectedAnswer !== null) {
            if (index === currentQ.correctAnswer) {
              bgColor = "bg-green-50";
              borderColor = "border-green-500";
              textColor = "text-green-700";
            } else if (index === selectedAnswer) {
              bgColor = "bg-red-50";
              borderColor = "border-red-500";
              textColor = "text-red-700";
            }
          }
          
          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 text-left rounded-lg border-2 ${bgColor} ${borderColor} ${textColor} transition-all ${
                selectedAnswer === null 
                  ? 'hover:border-biobio-blue hover:bg-blue-50 hover:shadow-sm cursor-pointer' 
                  : 'cursor-default'
              } disabled:cursor-not-allowed`}
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 font-bold ${
                  selectedAnswer === null 
                    ? 'bg-gray-100 text-gray-700' 
                    : index === currentQ.correctAnswer 
                    ? 'bg-green-500 text-white' 
                    : index === selectedAnswer
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="flex-1">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explicación */}
      {selectedAnswer !== null && currentQ.explanation && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              {selectedAnswer === currentQ.correctAnswer ? (
                <CheckCircle className="text-green-500 mt-0.5" size={20} />
              ) : (
                <XCircle className="text-red-500 mt-0.5" size={20} />
              )}
            </div>
            <div>
              <p className="font-medium text-blue-800 mb-1">Explicación:</p>
              <p className="text-blue-700">{currentQ.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Puntuación actual */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div>
          <span className="text-sm text-gray-600">Puntuación actual:</span>
          <div className="text-xl font-bold text-biobio-blue">{score} puntos</div>
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-600">Preguntas restantes:</span>
          <div className="text-xl font-bold text-gray-800">
            {questions.length - (currentQuestion + 1)}
          </div>
        </div>
      </div>
    </div>
  );
}