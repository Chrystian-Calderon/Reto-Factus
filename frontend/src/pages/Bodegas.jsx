import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Table from '../components/Table';
import { getBodegas } from '../services/bodegas.api.js';

const columns = [
  { key: 'name', label: 'Nombre' },
  { key: 'location', label: 'Ubicación' },
  { key: 'actions', label: 'Acciones' },
];

function Bodegas() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [bodegas, setBodegas] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const data = [];

  useEffect(() => {
    (async () => {
      const response = await getBodegas();
      if (response.success) {
        setBodegas(response.data);
        setTotalPages(response.totalPages || 0);
      }
    })();
  }, [])

  // Para acciones futuras, puedes mapear data y renderizar los botones de acción
  const tableData = bodegas.map(row => ({
    ...row,
    actions: (
      <div className="flex gap-2">
        <button className="p-1 rounded hover:bg-muted" title="Editar"><FaEdit /></button>
        <button className="p-1 rounded hover:bg-muted text-destructive" title="Eliminar"><FaTrash /></button>
      </div>
    )
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Bodegas</h1>
        <button className="flex items-center gap-2 px-4 py-2 rounded bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition">
          <FaPlus /> Crear
        </button>
      </div>
      <Table
        columns={columns}
        data={tableData}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        search={search}
        onSearch={setSearch}
      />
    </div>
  );
}

export default Bodegas;
