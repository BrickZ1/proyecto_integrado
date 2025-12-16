import { useState, useEffect } from "react";
import { BarChart3, Users, Trophy, Target } from "lucide-react";
import { getQuizStats } from "../../services/quizService";

const QuizStats = () => {
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    totalParticipants: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getQuizStats();
      setStats(data);
    } catch (error) {
      console.error("Error cargando estadísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Estadísticas del Quiz</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-500">
                Participantes Únicos
              </h4>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalParticipants}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="p-3 bg-green-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-500">
                Quizzes Completados
              </h4>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalQuizzes}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-500">
                Puntaje Promedio
              </h4>
              <p className="text-2xl font-bold text-gray-900">
                {stats.averageScore}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold">Distribución de Puntajes</h4>
          <button
            onClick={loadStats}
            className="text-sm text-primary-600 hover:text-primary-800"
          >
            Actualizar
          </button>
        </div>

        <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-center">
            <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Gráfico de distribución de puntajes</p>
            <p className="text-sm text-gray-400">
              (Implementar con Chart.js si se requiere)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizStats;
