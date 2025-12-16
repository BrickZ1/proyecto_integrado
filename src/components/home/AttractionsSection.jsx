const attractions = [
  {
    title: "Atractivos Naturales",
    description: "Descubre la belleza natural del Parque Angostura",
    icon: "🌲",
  },
  {
    title: "Atractivos Patrimoniales",
    description: "Conoce la historia y cultura de la región",
    icon: "🏛️",
  },
  {
    title: "Restaurantes",
    description: "Disfruta la gastronomía local",
    icon: "🍽️",
  },
  {
    title: "Alojamientos",
    description: "Encuentra el lugar perfecto para descansar",
    icon: "🏨",
  },
  {
    title: "Productos Artesanales",
    description: "Lleva un recuerdo único",
    icon: "🛍️",
  },
  {
    title: "Turismo Aventura",
    description: "Vive experiencias emocionantes",
    icon: "🚵",
  },
];

const AttractionsSection = () => {
  return (
    <section className="card">
      <h2 className="text-2xl font-bold mb-6 text-primary-700">
        ¿Qué hacer en Angostura del Biobío?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attractions.map((attraction, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-4">{attraction.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{attraction.title}</h3>
            <p className="text-gray-600">{attraction.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AttractionsSection;
