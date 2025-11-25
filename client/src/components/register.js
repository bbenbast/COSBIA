import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    ageBracket: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();

  const { username, password, confirmPassword, ageBracket } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('Username can only contain letters, numbers, and underscores');
      return;
    }

    if (!ageBracket) {
      setError('Please select your age bracket');
      return;
    }

    try {
      await register({ username, password, ageBracket });
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
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
        <select
          name="ageBracket"
          value={ageBracket}
          onChange={onChange}
          required
          style={{padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'white'}}
        >
          <option value="">Select Age Bracket</option>
          <option value="13-15">13-15 years old</option>
          <option value="16-17">16-17 years old</option>
        </select>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          required
          style={{padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChange}
          required
          style={{padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
        />
        <button 
          type="submit"
          style={{padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;