import React from "react";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-white/10 bg-gray-950 text-gray-400">
      <div className="mx-auto max-w-6xl px-4">
        <div className="py-8 text-center text-xs">
          <p>
            © {new Date().getFullYear()} Mi Tienda de Libros — Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
