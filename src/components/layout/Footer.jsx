import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Museo Parque Angostura</h3>
            <p className="text-gray-300 mb-4">
              Descubre la belleza natural y cultural de la Región del Biobío,
              Chile.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary-400">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary-400">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin size={18} className="mr-3 text-gray-400" />
                <span>Región del Biobío, Chile</span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-3 text-gray-400" />
                <span>+56 9 1234 5678</span>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="mr-3 text-gray-400" />
                <span>info@angosturadelbiobio.cl</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-primary-400">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/quiz" className="hover:text-primary-400">
                  Quiz
                </a>
              </li>
              <li>
                <a
                  href="https://angosturadelbiobio.cl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-400"
                >
                  Sitio Oficial
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Museo Parque Angostura. Todos los
            derechos reservados.
          </p>
          <p className="mt-2 text-sm">
            Desarrollado con React, Firebase y Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
