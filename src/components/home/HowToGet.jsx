import { Car, Train, Bus, MapPin } from "lucide-react";

const HowToGet = () => {
  const transportOptions = [
    {
      icon: <Car size={24} />,
      title: "En Auto",
      description: "Desde Santiago: Ruta 5 Sur hasta Chillán, luego Ruta Q-45",
      time: "5-6 horas",
    },
    {
      icon: <Bus size={24} />,
      title: "En Bus",
      description:
        "Buses directos desde Santiago a Chillán, luego transporte local",
      time: "6-7 horas",
    },
    {
      icon: <Train size={24} />,
      title: "En Tren",
      description:
        "Estación más cercana: Chillán, luego transporte local al parque",
      time: "5-6 horas",
    },
  ];

  return (
    <section className="card">
      <h2 className="text-2xl font-bold mb-6 text-primary-700">
        ¿Cómo llegar?
      </h2>

      <div className="mb-8">
        <div className="flex items-center mb-4">
          <MapPin size={24} className="text-primary-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold">Ubicación</h3>
            <p className="text-gray-600">
              Región del Biobío, Provincia de Ñuble, Chile
            </p>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <p className="text-gray-700">
            El Museo Parque Angostura se encuentra en una zona privilegiada de
            la Región del Biobío, ofreciendo paisajes naturales únicos y una
            rica biodiversidad.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {transportOptions.map((option, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-primary-100 rounded-lg mr-4">
                {option.icon}
              </div>
              <h3 className="text-lg font-semibold">{option.title}</h3>
            </div>
            <p className="text-gray-600 mb-3">{option.description}</p>
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium">
                Tiempo estimado: {option.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-blue-800 text-sm">
          💡 <strong>Recomendación:</strong> Consulta el sitio oficial para
          obtener las indicaciones más actualizadas y recomendaciones de viaje.
        </p>
      </div>
    </section>
  );
};

export default HowToGet;
