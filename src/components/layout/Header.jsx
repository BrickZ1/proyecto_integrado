const Header = () => {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-4xl font-bold mb-2">Museo Parque Angostura</h1>
            <p className="text-lg opacity-90">
              Descubre la belleza natural de la Región del Biobío, Chile
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="btn-primary bg-white text-primary-700 hover:bg-gray-100">
              Información
            </button>
            <a href="/quiz" className="btn-secondary">
              Tomar Quiz
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
