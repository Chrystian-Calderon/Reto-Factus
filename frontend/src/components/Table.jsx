import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';

function Table({ columns, data, page, totalPages, onPageChange, search, onSearch }) {
  return (
    <div className="bg-card rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-64">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="w-full pl-10 pr-3 py-2 border rounded bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Buscar..."
            value={search}
            onChange={e => onSearch(e.target.value)}
          />
        </div>
        {/* Aquí puedes poner otros controles */}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} className="px-4 py-2 text-left font-semibold text-muted-foreground border-b">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8 text-muted-foreground">Sin datos</td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i} className="border-b last:border-b-0">
                  {columns.map(col => (
                    <td key={col.key} className="px-4 py-2">{row[col.key]}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            className="p-2 rounded hover:bg-muted disabled:opacity-50"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
          >
            <FaChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
            .map((p, idx, arr) => [
              idx > 0 && p - arr[idx - 1] > 1 ? <span key={`dots-${p}`}>...</span> : null,
              <button
                key={p}
                className={`px-3 py-1 rounded ${p === page ? 'bg-primary text-primary-foreground font-bold' : 'hover:bg-muted'}`}
                onClick={() => onPageChange(p)}
                disabled={p === page}
              >
                {p}
              </button>
            ])}
          <button
            className="p-2 rounded hover:bg-muted disabled:opacity-50"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}

export default Table;
