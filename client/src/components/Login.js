import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login({ username, password });
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
      <form onSubmit={onSubmit} style={{display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px'}}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={onChange}
          required
          style={{padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          required
          style={{padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
        />
        <button 
          type="submit"
          style={{padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;