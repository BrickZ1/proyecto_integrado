import { useState } from "react";
import { Users, FileQuestion, BarChart3, Settings } from "lucide-react";
import QuestionCRUD from "./QuestionCRUD";
import UserCRUD from "./UserCRUD";
import QuizStats from "./QuizStats";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("questions");

  const tabs = [
    { id: "questions", label: "Preguntas", icon: <FileQuestion size={20} /> },
    { id: "users", label: "Usuarios Admin", icon: <Users size={20} /> },
    { id: "stats", label: "Estadísticas", icon: <BarChart3 size={20} /> },
    { id: "settings", label: "Configuración", icon: <Settings size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "questions":
        return <QuestionCRUD />;
      case "users":
        return <UserCRUD />;
      case "stats":
        return <QuizStats />;
      case "settings":
        return (
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">
              Configuración del Sitio
            </h3>
            <p>Configuraciones generales del sitio web.</p>
          </div>
        );
      default:
        return <QuestionCRUD />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Panel de Administración
        </h2>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
