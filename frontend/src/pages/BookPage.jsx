import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
  const base = import.meta.env.VITE_API_BASE_URL || '';
    fetch(`${base}/api/books/${encodeURIComponent(id)}`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setBook(data))
      .catch((err) => {
        console.error(err);
        setError(err.message || 'Error fetching book');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="mx-auto max-w-4xl px-4 py-10">Cargando…</div>;
  if (error) return <div className="mx-auto max-w-4xl px-4 py-10 text-red-400">Error: {error}</div>;
  if (!book) return <div className="mx-auto max-w-4xl px-4 py-10">No se encontró el libro.</div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link to="/" className="text-sm text-brand-300 hover:text-brand-200">← Volver</Link>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight">{book.title}</h2>
      <img
        src={book.imageUrl || '/images/placeholder.png'}
        alt={book.title}
        className="mt-4 h-[420px] w-[280px] rounded-2xl object-cover shadow-card"
      />
      <div className="mt-3 text-gray-300">{book.author}</div>
      <div className="mt-4 space-y-1 text-sm text-gray-300">
        {book.year ? <div><span className="font-semibold">Año:</span> {book.year}</div> : null}
        {book.isbn ? <div><span className="font-semibold">ISBN:</span> {book.isbn}</div> : null}
        {book.id ? <div className="mt-2 text-xs text-gray-500"><small>ID: {book.id}</small></div> : null}
      </div>

      {book.description ? (
        <section className="mt-6">
          <h4 className="mb-1 text-lg font-semibold">Descripción</h4>
          <p className="text-gray-300 leading-relaxed">{book.description}</p>
        </section>
      ) : null}
    </div>
  );
}