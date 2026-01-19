import { useEffect } from 'react';

function Alert({ open, type = 'success', message = '', onClose }) {
  useEffect(() => {
    if (open && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;
  const color = type === 'success' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300';
  const icon = type === 'success' ? (
    <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
  ) : (
    <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
  );
  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 border px-4 py-3 rounded flex items-center shadow-lg ${color}`} role="alert">
      {icon}
      <span className="flex-1">{message}</span>
    </div>
  );
}

export default Alert;
