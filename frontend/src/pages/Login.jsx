import { useState } from 'react';
import { login as loginApi } from '../services/auth';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await loginApi({ email: email, password });
      if (!result.success) {
        setError(result.message || 'Credenciales inválidas');
      }
      onLogin(result.user);
    } catch (err) {
      if (err.details) {
        setError(err.details);
      } else {
        setError(err.message || 'Credenciales inválidas');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-card">
        <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-muted-foreground">Correo electrónico</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ingrese su correo electrónico"
            />
            {error.email && <div className="text-destructive mt-1 text-sm">{error.email}</div>}
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-muted-foreground">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ingrese su contraseña"
            />
            {error.password && <div className="text-destructive mb-2 text-sm">{error.password}</div>}
          </div>
          {error.general && <div className="text-destructive mb-2 text-sm">{error.general}</div>}
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
