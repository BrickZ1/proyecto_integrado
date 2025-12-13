import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import QuizEnergetico from '../components/quiz/Quiz';
import { Link } from 'react-router-dom';

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introducción al quiz */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Quiz Interactivo</h1>
              <p className="text-xl text-gray-600">
                Pon a prueba tu conocimiento sobre el Parque Angostura del Biobío
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">5-10</div>
                <div className="text-sm text-gray-600">Preguntas por juego</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">30s</div>
                <div className="text-sm text-gray-600">Por pregunta</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">+100</div>
                <div className="text-sm text-gray-600">Puntos posibles</div>
              </div>
            </div>
            
            <div className="text-center text-gray-600 text-sm">
              <p>Las preguntas son gestionadas por el equipo del Parque Angostura</p>
              <p className="mt-1">¡Actualizadas regularmente con contenido educativo!</p>
            </div>
          </div>
          
          {/* Componente del quiz */}
          <QuizEnergetico />
          
          {/* Enlace admin */}
          <div className="mt-8 text-center">
            <Link 
              to="/admin/login" 
              className="text-biobio-blue hover:underline font-medium"
            >
              ¿Eres administrador? Accede al panel
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}