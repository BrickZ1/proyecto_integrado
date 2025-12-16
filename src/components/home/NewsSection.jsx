const NewsSection = () => {
  const newsItems = [
    {
      id: 1,
      title: "Nueva temporada de visitas guiadas",
      date: "2024-09-15",
      excerpt:
        "El parque abre nuevas rutas para visitas guiadas especializadas en flora y fauna local.",
      category: "Noticias",
    },
    {
      id: 2,
      title: "Festival cultural primavera 2024",
      date: "2024-08-30",
      excerpt:
        "Preparativos para el festival que celebra la cultura y tradiciones de la región.",
      category: "Eventos",
    },
    {
      id: 3,
      title: "Proyecto de conservación",
      date: "2024-08-20",
      excerpt: "Iniciativas para la protección de especies nativas del parque.",
      category: "Conservación",
    },
  ];

  return (
    <section className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary-700">
          Nuestras Noticias
        </h2>
        <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
          Ver todas →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                  {item.category}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString("es-CL")}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.excerpt}</p>
              <button className="mt-4 text-primary-600 hover:text-primary-800 text-sm font-medium">
                Leer más →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border border-primary-100">
        <h3 className="text-lg font-semibold mb-2 text-primary-700">
          ¡Mantente informado!
        </h3>
        <p className="text-gray-600 mb-4">
          Suscríbete a nuestro boletín para recibir las últimas noticias y
          actualizaciones del Museo Parque Angostura.
        </p>
        <div className="flex">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button className="btn-primary rounded-l-none">Suscribirse</button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
