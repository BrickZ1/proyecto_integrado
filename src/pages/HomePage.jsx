import HeroSection from "../components/home/HeroSection";
import AttractionsSection from "../components/home/AttractionsSection";
import HowToGet from "../components/home/HowToGet";
import NewsSection from "../components/home/NewsSection";

const HomePage = () => {
  return (
    <div className="space-y-12">
      <HeroSection />
      <AttractionsSection />
      <HowToGet />
      <NewsSection />

      <section className="card">
        <h2 className="text-2xl font-bold mb-6 text-primary-700">
          Emprendedores Locales
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="mb-4">
              El Centro de Emprendedores de Colbún (CEC) es uno de los motores
              principales para el crecimiento de los emprendedores locales del
              Destino Angostura del Biobío.
            </p>
            <p>
              Conoce las claves para desarrollar este ecosistema del
              emprendimiento y potenciar nuestro destino turístico en el
              siguiente vídeo.
            </p>
          </div>
          <div className="bg-gray-200 rounded-lg flex items-center justify-center h-48">
            <p className="text-gray-500">Video sobre emprendimiento local</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
