import { motion } from 'framer-motion';
import { ChevronDown, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div className="relative h-[80vh] overflow-hidden">
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-parque.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-biobio-blue/80 to-biobio-green/60"></div>
      </div>
      
      {/* Contenido */}
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="text-center text-white max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Parque Angostura
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Energía renovable y turismo sustentable en el corazón del Biobío
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
              <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <MapPin size={20} />
                <span>Región del Biobío, Chile</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <Calendar size={20} />
                <span>Inaugurado 2014</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/quiz"
                className="bg-white text-biobio-blue px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:-translate-y-1"
              >
                Jugar Quiz Interactivo
              </Link>
              <button className="border-2 border-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                Conocer Atractivos
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown size={32} className="text-white" />
      </motion.div>
    </div>
  );
}