import { atractivosData } from '../../data/atractivosData';
import AtractivoCard from './AtractivoCard';

export default function AtractivosGrid() {
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Nuestros Atractivos
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Descubre las 8 experiencias únicas que ofrece el Parque Angostura
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {atractivosData.map((atractivo) => (
          <AtractivoCard key={atractivo.id} atractivo={atractivo} />
        ))}
      </div>
    </div>
  );
}