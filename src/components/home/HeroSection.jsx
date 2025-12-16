const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          ¡Es tiempo de explorar!
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          Ven a disfrutar la naturaleza. En el Destino Angostura del Biobío
          tenemos muchos espacios naturales que compartir.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://angosturadelbiobio.cl/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary bg-white text-primary-700 hover:bg-gray-100 text-center"
          >
            Visitar Sitio Oficial
          </a>
          <a
            href="/quiz"
            className="btn-secondary bg-white text-secondary-700 hover:bg-gray-100 text-center"
          >
            Tomar Quiz
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
