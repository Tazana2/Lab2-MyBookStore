import React from 'react';
import { Link } from 'react-router';

export default function BookItem({ book }) {
  return (
    <li className="list-none">
      <Link
        to={`book/${encodeURIComponent(book.id)}`}
        className="group block rounded-2xl border border-white/10 bg-white/5 p-4 shadow-card backdrop-blur transition hover:-translate-y-1 hover:border-brand-400/40 hover:bg-white/10 hover:shadow-lg"
      >
        <img
          src={book.imageUrl || '/images/placeholder.png'}
          alt={book.title}
          className="mb-3 h-44 w-full rounded-xl object-cover"
          loading="lazy"
        />
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-semibold leading-tight group-hover:text-brand-300">{book.title}</div>
            {book.author ? (
              <div className="text-sm text-gray-400">{book.author}</div>
            ) : null}
          </div>
          <div className="shrink-0 rounded-full border border-white/10 bg-gray-900/50 px-2 py-0.5 text-[10px] text-gray-300">
            {book.year ?? ''}
          </div>
        </div>
      </Link>
    </li>
  );
}