import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/register';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <nav style={{ padding: '20px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{margin: 0}}>MERN Auth App</h1>
        {user ? (
          <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <span>Hello, <strong>{user.username}</strong></span>
            <button 
              onClick={logout}
              style={{
                padding: '8px 16px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div style={{fontSize: '16px', color: '#666'}}>
            Please log in or register
          </div>
        )}
      </nav>

      <main style={{ padding: '20px' }}>
        {user ? (
          <Dashboard />
        ) : (
          <div style={{display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Login />
            <Register />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;