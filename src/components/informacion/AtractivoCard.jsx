import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AtractivoCard({ atractivo }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      {/* Imagen */}
      <div className="relative h-48 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
          <span className="text-4xl">{atractivo.icono}</span>
        </div>
        
        {/* Badge categoría */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
            {atractivo.categoria}
          </span>
        </div>
      </div>
      
      {/* Contenido */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {atractivo.nombre}
        </h3>
        
        <p className="text-gray-600 mb-4">
          {atractivo.descripcion}
        </p>
        
        {/* Características */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {atractivo.caracteristicas.map((caract, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {caract}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}