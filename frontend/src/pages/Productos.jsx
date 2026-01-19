
import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaBan } from 'react-icons/fa';
import Table from '../components/Table';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import Alert from '../components/Alert';
import { getProductos, createProducto, updateProducto, deleteProducto } from '../services/productos.api.js';

const columns = [
  { key: 'name', label: 'Nombre' },
  { key: 'description', label: 'Descripción' },
  { key: 'stock_min', label: 'Stock' },
  { key: 'actions', label: 'Acciones' },
];

function Productos() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [productos, setProductos] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [openCreate, setOpenCreate] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', stock_min: '' });
  const [editForm, setEditForm] = useState({ id: null, name: '', description: '', stock_min: '', deleted_at: null });
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
      const response = await getProductos({ page, search });
      if (response.success) {
        const data = response.data.map(producto => ({
          ...producto,
          description: producto.description.length > 50
            ? producto.description.slice(0, 50) + '...'
            : producto.description,
        }));
        setProductos(data);
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
      const response = await createProducto(form);
      setLoading(false);
      if (response.success) {
        setOpenCreate(false);
        setForm({ name: '', description: '', stock_min: '' });
        setAlert({ open: true, type: 'success', message: response.message || 'Producto creado correctamente.' });
        // Refresh product list
        const refreshed = await getProductos({ page, search });
        if (refreshed.success) {
          setProductos(refreshed.data);
          setTotalPages(refreshed.totalPages || 0);
        }
      } else {
        setAlert({ open: true, type: 'error', message: response.message || 'Error al crear el producto.' });
      }
    } catch (error) {
      setLoading(false);
      setAlert({ open: true, type: 'error', message: error.message || 'Error al crear el producto.' });
      if (error.details) {
        setError(error.details);
      } else {
        setError(error.message || 'Error al crear el producto');
      }
    }
  }

  const submitEdit = async () => {
    try {
      setLoadingEdit(true);
      const response = await updateProducto(editForm.id, {
        name: editForm.name,
        description: editForm.description,
        stock_min: editForm.stock_min
      });
      setLoadingEdit(false);
      if (response.success) {
        setOpenEdit(false);
        setAlert({ open: true, type: 'success', message: response.message || 'Producto actualizado correctamente.' });
        const refreshed = await getProductos({ page, search });
        if (refreshed.success) {
          setProductos(refreshed.data);
          setTotalPages(refreshed.totalPages || 0);
        }
      } else {
        setAlert({ open: true, type: 'error', message: response.message || 'Error al actualizar el producto.' });
      }
    } catch (error) {
      setLoadingEdit(false);
      setAlert({ open: true, type: 'error', message: error.message || 'Error al actualizar el producto.' });
    }
  };

  const handleDeleted = async () => {
    try {
      setLoadingDelete(true);
      const response = await deleteProducto(selectedId);
      setLoadingDelete(false);
      if (response.success) {
        setAlert({ open: true, type: 'success', message: response.message || 'Producto eliminado correctamente.' });
        const refreshed = await getProductos({ page, search });
        if (refreshed.success) {
          setProductos(refreshed.data);
          setTotalPages(refreshed.totalPages || 0);
        }
      } else {
        setAlert({ open: true, type: 'error', message: response.message || 'Error al eliminar el producto.' });
      }
      setOpenConfirm(false);
    } catch (error) {
      setLoadingDelete(false);
      setAlert({ open: true, type: 'error', message: error.message || 'Error al eliminar el producto.' });
    }
  }

  const tableData = productos.map(row => ({
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
              description: row.description,
              stock_min: row.stock_min,
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

  const handleRestore = async () => {
    try {
      setLoadingEdit(true);
      // Suponiendo que updateProducto con deleted_at: null restaura
      const response = await updateProducto(editForm.id, {
        name: editForm.name,
        description: editForm.description,
        stock_min: editForm.stock_min,
        deleted_at: null
      });
      setLoadingEdit(false);
      if (response.success) {
        setOpenEdit(false);
        setAlert({ open: true, type: 'success', message: response.message || 'Producto restaurado correctamente.' });
        const refreshed = await getProductos({ page, search });
        if (refreshed.success) {
          setProductos(refreshed.data);
          setTotalPages(refreshed.totalPages || 0);
        }
      } else {
        setAlert({ open: true, type: 'error', message: response.message || 'Error al restaurar el producto.' });
      }
    } catch (error) {
      setLoadingEdit(false);
      setAlert({ open: true, type: 'error', message: error.message || 'Error al restaurar el producto.' });
    }
  };

  return (
    <div>
      <Alert open={alert.open} type={alert.type} message={alert.message} onClose={() => setAlert(a => ({ ...a, open: false }))} />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Gestiona tus productos</h1>
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
        title="Crear producto"
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
            {error && error.name && <div className="text-destructive mt-1 text-sm">{error.name}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              className="w-full px-3 py-2 border rounded bg-input text-foreground"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              required
            />
            {error && error.description && <div className="text-destructive mt-1 text-sm">{error.description}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="stock_min">Stock</label>
            <input
              id="stock_min"
              name="stock_min"
              type="number"
              min="0"
              className="w-full px-3 py-2 border rounded bg-input text-foreground"
              value={form.stock_min}
              onChange={e => setForm(f => ({ ...f, stock_min: e.target.value }))}
              required
            />
            {error && error.stock_min && <div className="text-destructive mt-1 text-sm">{error.stock_min}</div>}
          </div>
        </form>
      </Modal>

      <Modal
        open={openEdit}
        title={editForm.deleted_at ? 'Editar producto (Eliminado)' : 'Editar producto'}
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
            <label className="block text-sm font-medium mb-1" htmlFor="edit_description">Descripción</label>
            <textarea
              id="edit_description"
              name="description"
              className="w-full px-3 py-2 border rounded bg-input text-foreground"
              value={editForm.description}
              onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="edit_stock_min">Stock</label>
            <input
              id="edit_stock_min"
              name="stock_min"
              type="number"
              min="0"
              className="w-full px-3 py-2 border rounded bg-input text-foreground"
              value={editForm.stock_min}
              onChange={e => setEditForm(f => ({ ...f, stock_min: e.target.value }))}
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
        message="¿Estás seguro de eliminar este producto?"
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleDeleted}
        confirmLabel="Eliminar"
        loading={loadingDelete}
      />
    </div>
  );
}

export default Productos;
