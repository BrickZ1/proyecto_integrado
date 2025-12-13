import { useState, useEffect } from 'react';
import { 
  BarChart3, Users, CheckCircle, Clock, 
  TrendingUp, PieChart, Calendar 
} from 'lucide-react';
import { getQuizStats, getLeaderboard } from '../../services/firebaseService';

export default function QuizStats() {
  const [stats, setStats] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('all');

  useEffect(() => {
    loadStats();
  }, [timeRange]);

  const loadStats = async () => {
    setLoading(true);
    const [statsResult, leaderboardResult] = await Promise.all([
      getQuizStats(),
      getLeaderboard(10)
    ]);

    if (statsResult.success) {
      setStats(statsResult.data);
    }

    if (leaderboardResult.success) {
      setLeaderboard(leaderboardResult.data);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Estadísticas del Quiz</h1>
        <p className="text-gray-600">Métricas y análisis del rendimiento del quiz interactivo</p>
      </div>

      {/* Filtro de tiempo */}
      <div className="mb-6">
        <div className="flex gap-2">
          {['today', 'week', 'month', 'all'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range === 'today' ? 'Hoy' :
               range === 'week' ? 'Semana' :
               range === 'month' ? 'Mes' : 'Todos'}
            </button>
          ))}
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold text-blue-600">
                {stats?.totalQuestions || 0}
              </div>
              <div className="text-sm text-gray-600">Preguntas totales</div>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <BarChart3 className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold text-green-600">
                {stats?.activeQuestions || 0}
              </div>
              <div className="text-sm text-gray-600">Preguntas activas</div>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold text-purple-600">
                {stats?.totalAttempts || 0}
              </div>
              <div className="text-sm text-gray-600">Intentos totales</div>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold text-orange-600">
                {stats?.accuracy || 0}%
              </div>
              <div className="text-sm text-gray-600">Tasa de aciertos</div>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Distribución por categoría */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <PieChart className="text-blue-600" size={20} />
            Distribución por Categoría
          </h3>
          
          <div className="space-y-4">
            {stats?.byCategory && Object.entries(stats.byCategory).map(([category, count]) => {
              const percentage = (count / stats.totalQuestions) * 100;
              return (
                <div key={category}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-700">{category}</span>
                    <span className="text-gray-600">{count} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Distribución por dificultad */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BarChart3 className="text-green-600" size={20} />
            Distribución por Dificultad
          </h3>
          
          <div className="space-y-4">
            {stats?.byDifficulty && Object.entries(stats.byDifficulty).map(([difficulty, count]) => {
              const percentage = (count / stats.totalQuestions) * 100;
              const colorClass = difficulty === 'facil' ? 'bg-green-500' :
                                difficulty === 'medio' ? 'bg-yellow-500' : 'bg-red-500';
              const textColor = difficulty === 'facil' ? 'text-green-700' :
                               difficulty === 'medio' ? 'text-yellow-700' : 'text-red-700';
              
              return (
                <div key={difficulty}>
                  <div className="flex justify-between mb-1">
                    <span className={`font-medium ${textColor}`}>
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </span>
                    <span className="text-gray-600">{count} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className={`h-full ${colorClass} rounded-full`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Users className="text-purple-600" size={20} />
          Top 10 Jugadores
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Posición</th>
                <th className="text-left py-3 px-4">Jugador</th>
                <th className="text-left py-3 px-4">Puntaje</th>
                <th className="text-left py-3 px-4">Correctas</th>
                <th className="text-left py-3 px-4">Tiempo</th>
                <th className="text-left py-3 px-4">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((result, index) => (
                <tr key={result.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-100 text-gray-800' :
                      index === 2 ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-50 text-blue-800'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium">{result.playerName}</td>
                  <td className="py-3 px-4 font-bold text-blue-600">{result.score}</td>
                  <td className="py-3 px-4">
                    {result.correctAnswers}/{result.totalQuestions}
                  </td>
                  <td className="py-3 px-4">{result.timeSpent}s</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(result.date).toLocaleDateString('es-CL')}
                  </td>
                </tr>
              ))}
              
              {leaderboard.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-500">
                    No hay resultados todavía
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={loadStats}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700"
        >
          Actualizar Estadísticas
        </button>
      </div>
    </div>
  );
}