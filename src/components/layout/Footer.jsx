import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información del parque */}
          <div>
            <h3 className="text-xl font-bold mb-4">Parque Angostura</h3>
            <p className="text-gray-400 mb-4">
              Energía renovable y turismo sustentable en el corazón del Biobío, Chile.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="mailto:info@parqueangostura.cl" className="text-gray-400 hover:text-white">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} />
                <span>Región del Biobío, Chile</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={18} />
                <span>+56 9 1234 5678</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={18} />
                <span>info@parqueangostura.cl</span>
              </li>
            </ul>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-gray-400 hover:text-white">
                  Quiz Interactivo
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-gray-400 hover:text-white">
                  Panel de Administración
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>© {currentYear} Parque Angostura del Biobío. Todos los derechos reservados.</p>
          <p className="text-sm mt-2">Proyecto educativo sobre energía renovable y turismo sustentable</p>
        </div>
      </div>
    </footer>
  );
}