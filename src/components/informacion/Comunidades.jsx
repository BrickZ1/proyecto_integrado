import { Users, Building2, HeartHandshake } from 'lucide-react';

export default function Comunidades() {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Trabajo con Comunidades</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Desarrollo conjunto con las comunas de Quilaco y Santa Bárbara desde 2011
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quilaco */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="text-blue-600" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Quilaco</h3>
          <p className="text-gray-600 mb-4">
            Comuna rural de la Región del Biobío, conocida por su riqueza natural y tradiciones locales.
          </p>
          <div className="text-sm text-gray-500">
            <p>📍 Provincia de Biobío</p>
            <p>👥 Población: ~6,500 habitantes</p>
          </div>
        </div>

        {/* Santa Bárbara */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="text-green-600" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Santa Bárbara</h3>
          <p className="text-gray-600 mb-4">
            Comuna con rica historia colonial y paisajes naturales únicos en la ribera del Biobío.
          </p>
          <div className="text-sm text-gray-500">
            <p>📍 Provincia de Biobío</p>
            <p>👥 Población: ~13,000 habitantes</p>
          </div>
        </div>

        {/* Trabajo conjunto */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HeartHandshake className="text-purple-600" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Trabajo Conjunto</h3>
          <p className="text-gray-600 mb-4">
            Desde 2011 trabajando en conjunto para desarrollar capacidades locales y promover el turismo sustentable.
          </p>
          <div className="text-sm text-gray-500">
            <p>🤝 Mesa de Turismo conjunta</p>
            <p>📈 Emprendimientos locales apoyados</p>
            <p>🎓 Capacitaciones desarrolladas</p>
          </div>
        </div>
      </div>
    </div>
  );
}