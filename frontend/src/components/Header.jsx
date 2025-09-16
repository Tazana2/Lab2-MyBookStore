import { useState } from "react";
import { Link } from "react-router";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          to="/"
          onClick={closeMenu}
          className="font-display text-xl font-extrabold tracking-tight text-white hover:text-brand-300 transition-colors"
        >
          Mi Tienda de Libros
        </Link>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-200 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-gray-900 md:hidden"
          onClick={toggleMenu}
          aria-label="Abrir menú"
          aria-expanded={isMenuOpen}
        >
          <FiMenu className="h-6 w-6" />
        </button>

        <nav
          className={`absolute left-0 right-0 top-16 origin-top bg-gray-950/95 shadow-lg transition-all md:static md:shadow-none md:bg-transparent ${
            isMenuOpen ? 'scale-y-100 opacity-100' : 'pointer-events-none scale-y-95 opacity-0 md:opacity-100 md:pointer-events-auto'
          } md:transform-none`}
        >
          <ul className="flex flex-col gap-1 p-2 md:p-0 md:gap-6 md:flex-row md:items-center">
            <li>
              <Link
                to="/"
                onClick={closeMenu}
                className="relative block rounded-md px-3 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-400 md:after:absolute md:after:left-3 md:after:right-3 md:after:-bottom-0.5 md:after:h-0.5 md:after:origin-left md:after:scale-x-0 md:hover:after:scale-x-100 md:after:bg-accent-500 md:after:transition md:after:duration-200"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={closeMenu}
                className="relative block rounded-md px-3 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-400 md:after:absolute md:after:left-3 md:after:right-3 md:after:-bottom-0.5 md:after:h-0.5 md:after:origin-left md:after:scale-x-0 md:hover:after:scale-x-100 md:after:bg-accent-500 md:after:transition md:after:duration-200"
              >
                Acerca de
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;