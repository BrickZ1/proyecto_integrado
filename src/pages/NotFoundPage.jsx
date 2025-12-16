import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-9xl font-bold text-gray-200">404</div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Página no encontrada
          </h1>
          <p className="mt-2 text-gray-600">
            Lo sentimos, la página que estás buscando no existe o ha sido
            movida.
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/" className="btn-primary inline-flex items-center">
            <Home size={20} className="mr-2" />
            Volver al inicio
          </Link>

          <button
            onClick={() => window.history.back()}
            className="block w-full text-center text-primary-600 hover:text-primary-800"
          >
            <ArrowLeft size={20} className="inline-block mr-2" />
            Regresar a la página anterior
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500">
            ¿Buscas información sobre el Museo Parque Angostura?
          </p>
          <a
            href="https://angosturadelbiobio.cl/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-primary-600 hover:text-primary-800"
          >
            Visita el sitio oficial →
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
