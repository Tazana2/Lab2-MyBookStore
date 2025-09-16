function AboutPage() {
  const githubUrl = "https://github.com/Tazana2";
  const username = "Daniel Santana";
  const avatarUrl = "https://github.com/Tazana2.png";

  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight">Acerca del sitio</h1>
        <p className="mt-3 text-gray-300">
          Página simple para explorar la migración a la nube.
        </p>
      </div>
      <div className="mt-10 flex flex-col items-center justify-center">
        <div className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 p-6 text-center shadow-lg">
          <h2 className="font-semibold tracking-tight mb-6">Desarrollado por</h2>
          <img
            src={avatarUrl}
            alt={`Foto de perfil de ${username}`}
            loading="lazy"
            className="mx-auto h-28 w-28 rounded-full object-cover ring-2 ring-white/20"
          />
          <h1 className="mt-4 text-2xl font-bold tracking-tight">{username}</h1>

          <div className="mt-6">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Ver perfil en GitHub
              <span aria-hidden="true" className="ml-2">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
