import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { loginAdmin, checkAuthState } from '../../services/firebaseService';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = checkAuthState((user) => {
      setIsCheckingAuth(false);
      if (user) {
        navigate('/admin');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    const result = await loginAdmin(email, password);

    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const handleDemoLogin = () => {
    setEmail('admin@parqueangostura.cl');
    setPassword('admin123');
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-biobio-blue to-biobio-green flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p>Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-biobio-blue to-biobio-green flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-biobio-blue to-biobio-green rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-white" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Panel de Administración</h2>
          <p className="text-gray-600 mt-2">Parque Angostura del Biobío</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-red-700 text-sm">{error}</div>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">Correo Electrónico</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-biobio-blue focus:border-transparent transition-all"
                placeholder="admin@parqueangostura.cl"
                required
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 mb-2 font-medium">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-biobio-blue focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold transition-all ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-biobio-blue to-biobio-green text-white hover:opacity-90'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                <span>Iniciando sesión...</span>
              </div>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={handleDemoLogin}
            className="w-full border-2 border-biobio-blue text-biobio-blue py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
          >
            Usar credenciales de demo
          </button>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            <p className="mb-2">Credenciales para prueba:</p>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="font-mono">admin@parqueangostura.cl</p>
              <p className="font-mono">admin123</p>
            </div>
            <p className="mt-3 text-xs">
              Nota: Primero debes crear este usuario en Firebase Authentication
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="text-biobio-blue hover:underline font-medium"
          >
            ← Volver al sitio principal
          </a>
        </div>
      </div>
    </div>
  );
}