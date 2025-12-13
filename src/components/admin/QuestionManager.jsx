import { useState, useEffect } from 'react';
import { 
  Plus, Search, Filter, Edit, Trash2, 
  Eye, EyeOff, Save, X, AlertCircle,
  RefreshCw, Download, Upload 
} from 'lucide-react';
import { 
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuizStats 
} from '../../services/firebaseService';

export default function QuestionManager() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    category: 'general',
    difficulty: 'medio',
    active: true
  });

  const loadQuestions = async () => {
    setLoading(true);
    setError('');
    
    const result = await getAllQuestions();
    
    if (result.success) {
      setQuestions(result.data);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = searchTerm === '' || 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.explanation?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'todas' || q.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (question) => {
    setEditingId(question.id);
    setFormData({
      question: question.question,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
      explanation: question.explanation || '',
      category: question.category || 'general',
      difficulty: question.difficulty || 'medio',
      active: question.active !== false
    });
    setSuccess('');
    setError('');
  };

  const handleSave = async () => {
    if (!formData.question.trim()) {
      setError('La pregunta es obligatoria');
      return;
    }
    
    if (formData.options.some(opt => !opt.trim())) {
      setError('Todas las opciones deben estar completas');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    if (editingId) {
      const result = await updateQuestion(editingId, formData);
      
      if (result.success) {
        setSuccess('Pregunta actualizada correctamente');
        setEditingId(null);
        resetForm();
      } else {
        setError(result.error);
      }
    } else {
      const result = await createQuestion(formData);
      
      if (result.success) {
        setSuccess('Pregunta creada correctamente');
        resetForm();
      } else {
        setError(result.error);
      }
    }
    
    await loadQuestions();
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta pregunta?')) {
      return;
    }
    
    setLoading(true);
    const result = await deleteQuestion(id);
    
    if (result.success) {
      setSuccess('Pregunta eliminada correctamente');
      await loadQuestions();
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const toggleActive = async (id, currentActive) => {
    setLoading(true);
    const result = await updateQuestion(id, { active: !currentActive });
    
    if (result.success) {
      await loadQuestions();
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      category: 'general',
      difficulty: 'medio',
      active: true
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const categories = [
    { id: 'todas', name: 'Todas' },
    { id: 'historia', name: 'Historia' },
    { id: 'energia', name: 'Energía' },
    { id: 'atractivos', name: 'Atractivos' },
    { id: 'sustentabilidad', name: 'Sustentabilidad' },
    { id: 'comunidad', name: 'Comunidad' }
  ];

  if (loading && questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando preguntas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-green-700">{success}</div>
        </div>
      )}
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-red-700">{error}</div>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gestión de Preguntas
        </h1>
        <p className="text-gray-600">
          Administra las preguntas del quiz interactivo
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingId ? 'Editar Pregunta' : 'Nueva Pregunta'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Pregunta *</label>
                <textarea
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg h-32"
                  placeholder="Escribe la pregunta aquí..."
                  disabled={loading}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Opciones *</label>
                <div className="space-y-3">
                  {formData.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={formData.correctAnswer === index}
                        onChange={() => setFormData({ ...formData, correctAnswer: index })}
                        className="h-5 w-5 text-blue-600"
                        disabled={loading}
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="flex-1 p-3 border border-gray-300 rounded"
                        placeholder={`Opción ${index + 1}`}
                        disabled={loading}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Explicación</label>
                <textarea
                  value={formData.explanation}
                  onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg h-24"
                  placeholder="Explicación de la respuesta..."
                  disabled={loading}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Categoría</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    disabled={loading}
                  >
                    {categories.slice(1).map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Dificultad</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    disabled={loading}
                  >
                    <option value="facil">Fácil</option>
                    <option value="medio">Medio</option>
                    <option value="dificil">Difícil</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Guardando...' : editingId ? 'Actualizar' : 'Guardar'}
                </button>
                
                {editingId && (
                  <button
                    onClick={() => {
                      setEditingId(null);
                      resetForm();
                    }}
                    disabled={loading}
                    className="px-6 border border-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="Buscar preguntas..."
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Categoría</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Lista */}
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Preguntas ({filteredQuestions.length})
              </h3>
              <button
                onClick={loadQuestions}
                disabled={loading}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              </button>
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {filteredQuestions.map((question) => (
                <div 
                  key={question.id} 
                  className={`p-4 border rounded-lg ${editingId === question.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-800 truncate">
                      {question.question}
                    </h4>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit(question)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(question.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        onClick={() => toggleActive(question.id, question.active)}
                        className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                      >
                        {question.active ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2 truncate">
                    ✓ {question.options[question.correctAnswer]}
                  </div>
                  
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                      {question.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      question.difficulty === 'facil' ? 'text-green-600' :
                      question.difficulty === 'medio' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {question.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}