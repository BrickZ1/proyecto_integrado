import { Calendar, Zap, Users, Target } from 'lucide-react';

export default function ProyectoInfo() {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Sobre el Proyecto</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Una iniciativa que combina generación de energía renovable con desarrollo turístico sustentable
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Información principal */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Información General</h3>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="text-blue-600" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Inauguración</h4>
                <p className="text-gray-600">El Parque Angostura fue inaugurado en el año 2014</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Zap className="text-green-600" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Energía Renovable</h4>
                <p className="text-gray-600">Central hidroeléctrica con variación mínima de cota del embalse</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="text-purple-600" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Comunidades</h4>
                <p className="text-gray-600">Trabajo conjunto con las comunas de Quilaco y Santa Bárbara</p>
              </div>
            </div>
          </div>
        </div>

        {/* Objetivos */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Nuestros Objetivos</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Target className="text-biobio-green mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-gray-900">Generación de Energía Limpia</h4>
                <p className="text-gray-600">Producir energía renovable para la región</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Target className="text-biobio-green mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-gray-900">Turismo Sustentable</h4>
                <p className="text-gray-600">Desarrollar atractivos turísticos en armonía con el entorno</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Target className="text-biobio-green mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-gray-900">Educación Ambiental</h4>
                <p className="text-gray-600">Concientizar sobre la importancia de la energía renovable</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Target className="text-biobio-green mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-gray-900">Desarrollo Local</h4>
                <p className="text-gray-600">Fortalecer las capacidades de las comunidades locales</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}