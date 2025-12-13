import { useState } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { 
  LogOut, BarChart3, FileText, Users, 
  Settings, Home, Menu, X 
} from 'lucide-react';
import { logoutAdmin } from '../../services/firebaseService';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: 'preguntas', label: 'Preguntas', icon: <FileText size={20} /> },
    { path: 'estadisticas', label: 'Estadísticas', icon: <BarChart3 size={20} /> },
    { path: 'leaderboard', label: 'Leaderboard', icon: <Users size={20} /> },
    { path: 'configuracion', label: 'Configuración', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 fixed md:relative w-64 bg-white shadow-lg min-h-screen transition-transform z-40
        `}>
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-gray-900">Admin Parque Angostura</h1>
            <p className="text-sm text-gray-600 mt-1">Panel de administración</p>
          </div>
          
          <nav className="p-4">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === 'preguntas'}
                  className={({ isActive }) => `
                    flex items-center gap-3 p-3 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600 font-bold' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                  onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <button
                onClick={() => navigate('/')}
                className="w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Home size={20} />
                <span>Volver al sitio</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg mt-2"
              >
                <LogOut size={20} />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="bg-white shadow-sm p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">
                Panel de Administración
              </h2>
              <div className="text-sm text-gray-600">
                {new Date().toLocaleDateString('es-CL')}
              </div>
            </div>
          </div>
          
          <div className="p-4 md:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}