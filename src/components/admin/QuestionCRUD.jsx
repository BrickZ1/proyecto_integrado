import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../../services/quizService";
import toast from "react-hot-toast";

const QuestionCRUD = () => {
  const [questions, setQuestions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctOption: 0,
    category: "general",
    difficulty: "medium",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const data = await getQuestions();
      setQuestions(data);
    } catch (error) {
      toast.error("Error cargando preguntas");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateQuestion(editingId, formData);
        toast.success("Pregunta actualizada");
      } else {
        await createQuestion(formData);
        toast.success("Pregunta creada");
      }

      resetForm();
      loadQuestions();
    } catch (error) {
      toast.error("Error guardando pregunta");
    }
  };

  const handleEdit = (question) => {
    setEditingId(question.id);
    setFormData({
      question: question.question,
      options: [...question.options],
      correctOption: question.correctOption,
      category: question.category,
      difficulty: question.difficulty,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta pregunta?")) {
      try {
        await deleteQuestion(id);
        toast.success("Pregunta eliminada");
        loadQuestions();
      } catch (error) {
        toast.error("Error eliminando pregunta");
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      question: "",
      options: ["", "", "", ""],
      correctOption: 0,
      category: "general",
      difficulty: "medium",
    });
  };

  const updateOption = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  if (loading) {
    return <div>Cargando preguntas...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">
          {editingId ? "Editar Pregunta" : "Crear Nueva Pregunta"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pregunta
            </label>
            <textarea
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
              className="input-field"
              rows="3"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="input-field"
              >
                <option value="general">General</option>
                <option value="history">Historia</option>
                <option value="nature">Naturaleza</option>
                <option value="culture">Cultura</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dificultad
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData({ ...formData, difficulty: e.target.value })
                }
                className="input-field"
              >
                <option value="easy">Fácil</option>
                <option value="medium">Media</option>
                <option value="hard">Difícil</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Opciones de Respuesta
            </label>
            {formData.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="correctOption"
                  checked={formData.correctOption === index}
                  onChange={() =>
                    setFormData({ ...formData, correctOption: index })
                  }
                  className="h-4 w-4 text-primary-600"
                />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  className="input-field flex-grow"
                  placeholder={`Opción ${index + 1}`}
                  required
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3">
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="btn-secondary bg-gray-500 hover:bg-gray-600"
              >
                <X size={20} className="mr-2" />
                Cancelar
              </button>
            )}
            <button type="submit" className="btn-primary">
              {editingId ? (
                <>
                  <Save size={20} className="mr-2" />
                  Actualizar
                </>
              ) : (
                <>
                  <Plus size={20} className="mr-2" />
                  Crear
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold mb-4">
          Lista de Preguntas ({questions.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pregunta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dificultad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {questions.map((question) => (
                <tr key={question.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {question.question.substring(0, 50)}...
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {question.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        question.difficulty === "easy"
                          ? "bg-green-100 text-green-800"
                          : question.difficulty === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {question.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(question)}
                      className="text-primary-600 hover:text-primary-900 mr-3"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(question.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuestionCRUD;
