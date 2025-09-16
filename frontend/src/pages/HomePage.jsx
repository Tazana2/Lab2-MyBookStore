import React, { useEffect, useState } from 'react';
import BookItem from '../components/BookItem';

export default function Home() {
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5001/api/books')
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Si tu backend retorna { items: [...], lastKey } (paginación),
        // adaptamos: soporta ambos formatos.
        if (Array.isArray(data)) setBooks(data);
        else if (Array.isArray(data.items)) setBooks(data.items);
        else setBooks([]);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || 'Error fetching books');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="mx-auto max-w-6xl px-4 py-10">Cargando libros…</div>;
  if (error) return <div className="mx-auto max-w-6xl px-4 py-10 text-red-400">Error: {error}</div>;
  if (!books || books.length === 0) return <div className="mx-auto max-w-6xl px-4 py-10">No hay libros aún.</div>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="bg-gradient-to-r from-brand-300 via-accent-500 to-brand-400 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">Listado de libros</h2>
        <div className="text-sm text-gray-400">{books.length} items</div>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((b) => (
          <BookItem key={b.id} book={b} />
        ))}
      </ul>
    </div>
  );
}