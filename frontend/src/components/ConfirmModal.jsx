function ConfirmModal({ open, message, onClose, onConfirm, confirmLabel = 'Aceptar', cancelLabel = 'Cancelar', loading = false }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-sm relative animate-fade-in">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-bold text-foreground">Confirmar acción</span>
          <button onClick={onClose} className="text-xl text-muted-foreground hover:text-foreground p-1 rounded transition" aria-label="Cerrar">&times;</button>
        </div>
        <div className="p-4 text-foreground text-center">{message}</div>
        <div className="flex justify-end gap-2 p-4 border-t bg-muted rounded-b-lg">
          <button onClick={onClose} className="px-4 py-2 rounded bg-muted text-foreground hover:bg-muted/80 transition" disabled={loading}>{cancelLabel}</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded bg-destructive text-destructive-foreground font-semibold hover:bg-destructive/90 transition" disabled={loading}>
            {loading ? 'Procesando...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
