import { useState, useEffect } from 'react';
import { 
  Trophy, Crown, Medal, Star, Filter, 
  Download, Calendar, Clock, Award 
} from 'lucide-react';
import { getLeaderboard } from '../../services/firebaseService';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('all');
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    loadLeaderboard();
  }, [timeFilter, limit]);

  const loadLeaderboard = async () => {
    setLoading(true);
    const result = await getLeaderboard(limit);
    
    if (result.success) {
      setLeaderboard(result.data);
    }
    
    setLoading(false);
  };

  const getRankIcon = (index) => {
    if (index === 0) return <Crown className="text-yellow-500" size={24} />;
    if (index === 1) return <Medal className="text-gray-400" size={24} />;
    if (index === 2) return <Medal className="text-orange-500" size={24} />;
    return <Star className="text-blue-400" size={20} />;
  };

  const getRankColor = (index) => {
    if (index === 0) return 'bg-yellow-50 border-yellow-200';
    if (index === 1) return 'bg-gray-50 border-gray-200';
    if (index === 2) return 'bg-orange-50 border-orange-200';
    return 'bg-white border-gray-200';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Encabezado */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Trophy className="text-yellow-500" size={32} />
          <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
          <Trophy className="text-yellow-500" size={32} />
        </div>
        <p className="text-gray-600">Los mejores jugadores del quiz del Parque Angostura</p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              <Filter className="inline mr-2" size={18} />
              Período
            </label>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="all">Todos los tiempos</option>
              <option value="today">Hoy</option>
              <option value="week">Esta semana</option>
              <option value="month">Este mes</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              <Award className="inline mr-2" size={18} />
              Mostrar
            </label>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="5">Top 5</option>
              <option value="10">Top 10</option>
              <option value="20">Top 20</option>
              <option value="50">Top 50</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={loadLeaderboard}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
            >
              Actualizar
            </button>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Encabezado de la tabla */}
        <div className="grid grid-cols-12 bg-gray-50 border-b font-bold text-gray-700">
          <div className="col-span-1 p-4 text-center">#</div>
          <div className="col-span-4 p-4">Jugador</div>
          <div className="col-span-2 p-4 text-center">Puntaje</div>
          <div className="col-span-2 p-4 text-center">Aciertos</div>
          <div className="col-span-3 p-4 text-center">Fecha</div>
        </div>

        {/* Lista de jugadores */}
        <div className="divide-y">
          {leaderboard.map((player, index) => (
            <div 
              key={player.id} 
              className={`grid grid-cols-12 items-center hover:bg-gray-50 transition-colors ${getRankColor(index)} border-l-4 ${
                index === 0 ? 'border-l-yellow-400' :
                index === 1 ? 'border-l-gray-400' :
                index === 2 ? 'border-l-orange-400' :
                'border-l-blue-400'
              }`}
            >
              {/* Posición */}
              <div className="col-span-1 p-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="mb-1">{getRankIcon(index)}</div>
                  <span className={`text-lg font-bold ${
                    index === 0 ? 'text-yellow-600' :
                    index === 1 ? 'text-gray-600' :
                    index === 2 ? 'text-orange-600' :
                    'text-blue-600'
                  }`}>
                    {index + 1}
                  </span>
                </div>
              </div>

              {/* Jugador */}
              <div className="col-span-4 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-blue-600">
                      {player.playerName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{player.playerName}</div>
                    <div className="text-sm text-gray-600">Quiz completado</div>
                  </div>
                </div>
              </div>

              {/* Puntaje */}
              <div className="col-span-2 p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{player.score}</div>
                <div className="text-sm text-gray-600">puntos</div>
              </div>

              {/* Aciertos */}
              <div className="col-span-2 p-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                    (player.correctAnswers / player.totalQuestions) >= 0.8 ? 'bg-green-100 text-green-800' :
                    (player.correctAnswers / player.totalQuestions) >= 0.6 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {player.correctAnswers}/{player.totalQuestions}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {Math.round((player.correctAnswers / player.totalQuestions) * 100)}%
                </div>
              </div>

              {/* Fecha */}
              <div className="col-span-3 p-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar size={16} />
                    <span>{new Date(player.date).toLocaleDateString('es-CL')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                    <Clock size={14} />
                    <span>{player.timeSpent}s total</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {leaderboard.length === 0 && (
            <div className="col-span-12 py-12 text-center">
              <Trophy className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500 text-lg">No hay resultados todavía</p>
              <p className="text-gray-400 mt-2">Los jugadores aparecerán aquí cuando completen el quiz</p>
            </div>
          )}
        </div>
      </div>

      {/* Estadísticas adicionales */}
      {leaderboard.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">Puntaje Promedio</h3>
            <div className="text-3xl font-bold text-blue-600">
              {Math.round(leaderboard.reduce((sum, p) => sum + p.score, 0) / leaderboard.length)}
            </div>
            <div className="text-sm text-gray-600 mt-2">entre {leaderboard.length} jugadores</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">Mejor Puntaje</h3>
            <div className="text-3xl font-bold text-yellow-600">
              {leaderboard[0]?.score || 0}
            </div>
            <div className="text-sm text-gray-600 mt-2">
              por {leaderboard[0]?.playerName || 'Nadie aún'}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">Tiempo Promedio</h3>
            <div className="text-3xl font-bold text-green-600">
              {Math.round(leaderboard.reduce((sum, p) => sum + p.timeSpent, 0) / leaderboard.length)}s
            </div>
            <div className="text-sm text-gray-600 mt-2">por quiz completado</div>
          </div>
        </div>
      )}

      {/* Botón exportar */}
      <div className="mt-8 text-center">
        <button
          onClick={() => {
            const dataStr = JSON.stringify(leaderboard, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            const link = document.createElement('a');
            link.setAttribute('href', dataUri);
            link.setAttribute('download', `leaderboard-${new Date().toISOString().split('T')[0]}.json`);
            link.click();
          }}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700"
        >
          <Download size={20} />
          Exportar Leaderboard (JSON)
        </button>
      </div>
    </div>
  );
}