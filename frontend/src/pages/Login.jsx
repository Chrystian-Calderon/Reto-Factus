import { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Simulación de login, reemplazar con llamada real a backend
    if (username === 'admin' && password === 'admin') {
      onLogin({ username });
    } else {
      setError('Nombre o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container" style={{ maxWidth: 400, margin: 'auto', padding: 32 }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="username">Nombre</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
            placeholder="Ingrese su nombre"
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
            placeholder="Ingrese su contraseña"
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
        <button type="submit" style={{ width: '100%', padding: 10 }}>Entrar</button>
      </form>
    </div>
  );
}

export default Login;
