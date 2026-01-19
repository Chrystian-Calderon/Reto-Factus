import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaBan } from 'react-icons/fa';
import Table from '../components/Table';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import Alert from '../components/Alert';
import { getBodegas, createBodega, updateBodega, deleteBodega } from '../services/bodegas.api.js';

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
  const [openCreate, setOpenCreate] = useState(false);
  const [form, setForm] = useState({ name: '', location: '' });
  const [editForm, setEditForm] = useState({ id: null, name: '', location: '', deleted_at: null });
  const [openEdit, setOpenEdit] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [alert, setAlert] = useState({ open: false, type: 'success', message: '' });

  useEffect(() => {
    (async () => {
      const response = await getBodegas({ page, search });
      if (response.success) {
        setBodegas(response.data);
        setTotalPages(response.totalPages || 0);
      }
    })();
  }, [page, search]);

  function handleSearch(value) {
    setSearch(value);
    setPage(1);
  }

  const submitCreate = async () => {
    try {
      setLoading(true);
      const response = await createBodega(form);
      setLoading(false);
      if (response.success) {
        setOpenCreate(false);
        setForm({ name: '', location: '' });
        setAlert({ open: true, type: 'success', message: response.message || 'Bodega creada correctamente.' });
        const refreshed = await getBodegas({ page, search });
        if (refreshed.success) {
          setBodegas(refreshed.data);
          setTotalPages(refreshed.totalPages || 0);
        }
      } else {
        setAlert({ open: true, type: 'error', message: response.message || 'Error al crear la bodega.' });
      }
    } catch (error) {
      setLoading(false);
      setAlert({ open: true, type: 'error', message: error.message || 'Error al crear la bodega.' });
      if (error.details) {
        setError(error.details);
      } else {
        setError(error.message || 'Error al crear la bodega');
      }
    }
  };

  const submitEdit = async () => {
    try {
      setLoadingEdit(true);
      const response = await updateBodega(editForm.id, {
        name: editForm.name,
        location: editForm.location
      });
      setLoadingEdit(false);
      if (response.success) {
        setOpenEdit(false);
        setAlert({ open: true, type: 'success', message: response.message || 'Bodega actualizada correctamente.' });
        const refreshed = await getBodegas({ page, search });
        if (refreshed.success) {
          setBodegas(refreshed.data);
          setTotalPages(refreshed.totalPages || 0);
        }
      } else {
        setAlert({ open: true, type: 'error', message: response.message || 'Error al actualizar la bodega.' });
      }
    } catch (error) {
      setLoadingEdit(false);
      setAlert({ open: true, type: 'error', message: error.message || 'Error al actualizar la bodega.' });
    }
  };

  const handleDeleted = async () => {
    try {
      setLoadingDelete(true);
      const response = await deleteBodega(selectedId);
      setLoadingDelete(false);
      if (response.success) {
        setAlert({ open: true, type: 'success', message: response.message || 'Bodega eliminada correctamente.' });
        const refreshed = await getBodegas({ page, search });
        if (refreshed.success) {
          setBodegas(refreshed.data);
          setTotalPages(refreshed.totalPages || 0);
        }
      } else {
        setAlert({ open: true, type: 'error', message: response.message || 'Error al eliminar la bodega.' });
      }
      setOpenConfirm(false);
    } catch (error) {
      setLoadingDelete(false);
      setAlert({ open: true, type: 'error', message: error.message || 'Error al eliminar la bodega.' });
    }
  };

  const handleRestore = async () => {
    try {
      setLoadingEdit(true);
      const response = await updateBodega(editForm.id, {
        name: editForm.name,
        location: editForm.location,
        deleted_at: null
      });
      setLoadingEdit(false);
      if (response.success) {
        setOpenEdit(false);
        setAlert({ open: true, type: 'success', message: response.message || 'Bodega restaurada correctamente.' });
        const refreshed = await getBodegas({ page, search });
        if (refreshed.success) {
          setBodegas(refreshed.data);
          setTotalPages(refreshed.totalPages || 0);
        }
      } else {
        setAlert({ open: true, type: 'error', message: response.message || 'Error al restaurar la bodega.' });
      }
    } catch (error) {
      setLoadingEdit(false);
      setAlert({ open: true, type: 'error', message: error.message || 'Error al restaurar la bodega.' });
    }
  };

  const tableData = bodegas.map(row => ({
    ...row,
    actions: (
      <div className="flex gap-2 items-center">
        <button
          className="p-1 rounded hover:bg-muted"
          title="Editar"
          onClick={() => {
            setEditForm({
              id: row.id,
              name: row.name,
              location: row.location,
              deleted_at: row.deleted_at || null
            });
            setOpenEdit(true);
          }}
        >
          <FaEdit />
        </button>
        {row.deleted_at ? (
          <span className="flex items-center gap-1 text-muted-foreground" title="Eliminado"><FaBan className="text-lg" /></span>
        ) : (
          <button
            className="p-1 rounded hover:bg-muted text-destructive"
            title="Eliminar"
            onClick={() => {
              setSelectedId(row.id);
              setOpenConfirm(true);
            }}
          >
            <FaTrash />
          </button>
        )}
      </div>
    )
  }));

  return (
    <div>
      <Alert open={alert.open} type={alert.type} message={alert.message} onClose={() => setAlert(a => ({ ...a, open: false }))} />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Bodegas</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
          onClick={() => setOpenCreate(true)}
        >
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
        onSearch={handleSearch}
      />

      <Modal
        open={openCreate}
        title="Crear bodega"
        onClose={() => setOpenCreate(false)}
        onAccept={submitCreate}
        acceptLabel="Crear"
        loading={loading}
      >
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">Nombre</label>
            <input
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded bg-input text-foreground"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="location">Ubicación</label>
            <input
              id="location"
              name="location"
              className="w-full px-3 py-2 border rounded bg-input text-foreground"
              value={form.location}
              onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
              required
            />
          </div>
        </form>
      </Modal>

      <Modal
        open={openEdit}
        title={editForm.deleted_at ? 'Editar bodega (Eliminada)' : 'Editar bodega'}
        onClose={() => setOpenEdit(false)}
        onAccept={submitEdit}
        acceptLabel={editForm.deleted_at ? 'Actualizar' : 'Actualizar'}
        loading={loadingEdit}
      >
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="edit_name">Nombre</label>
            <input
              id="edit_name"
              name="name"
              className="w-full px-3 py-2 border rounded bg-input text-foreground"
              value={editForm.name}
              onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="edit_location">Ubicación</label>
            <input
              id="edit_location"
              name="location"
              className="w-full px-3 py-2 border rounded bg-input text-foreground"
              value={editForm.location}
              onChange={e => setEditForm(f => ({ ...f, location: e.target.value }))}
              required
            />
          </div>
        </form>
        {/* <div className="flex justify-between mt-4">
          {editForm.deleted_at ? (
            <button
              className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition"
              type="button"
              onClick={handleRestore}
              disabled={loadingEdit}
            >
              Restaurar
            </button>
          ) : (
            <button
              className="px-4 py-2 rounded bg-destructive text-destructive-foreground font-semibold hover:bg-destructive/90 transition"
              type="button"
              onClick={() => {
                setSelectedId(editForm.id);
                setOpenEdit(false);
                setOpenConfirm(true);
              }}
              disabled={loadingEdit}
            >
              Eliminar
            </button>
          )}
        </div> */}
      </Modal>

      <ConfirmModal
        open={openConfirm}
        message="¿Estás seguro de eliminar esta bodega?"
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleDeleted}
        confirmLabel="Eliminar"
        loading={loadingDelete}
      />
    </div>
  );
}

export default Bodegas;
