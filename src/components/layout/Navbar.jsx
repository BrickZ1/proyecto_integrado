import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, HelpCircle, LogIn } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  const navItems = [
    { path: "/", label: "Inicio", icon: <Home size={20} /> },
    { path: "/quiz", label: "Quiz", icon: <HelpCircle size={20} /> },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary-700">
              Museo Parque Angostura
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </div>
              </Link>
            ))}

            {isAdmin && (
              <Link
                to="/admin"
                className="px-3 py-2 rounded-md text-sm font-medium bg-green-100 text-green-700 hover:bg-green-200"
              >
                Panel Admin
              </Link>
            )}

            {!user && (
              <Link
                to="/admin"
                className="px-3 py-2 rounded-md text-sm font-medium flex items-center text-gray-700 hover:bg-gray-100"
              >
                <LogIn size={20} className="mr-2" />
                Admin
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.path
                      ? "bg-primary-100 text-primary-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </div>
                </Link>
              ))}

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium bg-green-100 text-green-700"
                >
                  Panel Admin
                </Link>
              )}

              {!user && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium flex items-center text-gray-700 hover:bg-gray-100"
                >
                  <LogIn size={20} className="mr-2" />
                  Admin
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
