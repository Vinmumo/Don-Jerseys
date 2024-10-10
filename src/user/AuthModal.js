import axios from 'axios';
import { useState } from 'react';
import './AuthModal.css'

function AuthModal({ isOpen, onClose }) {
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      if (isSignup) {
        // Signup logic
        const response = await axios.post('/signup', { username, email, password });
        if (response.data.message === "User registered successfully") {
          onClose(); // Close the modal on success
        }
      } else {
        // Login logic
        const response = await axios.post('/login', { email, password });
        if (response.data.message === "User logged in successfully") {
          onClose(); // Close the modal on success
        }
      }
    } catch (err) {
      setError(`Error ${isSignup ? 'signing up' : 'logging in'}`);
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-box">
          <button className="modal-close" onClick={onClose}>X</button>
          <h2>{isSignup ? "Sign Up" : "Login"}</h2>

          <form onSubmit={handleAuth}>
            {isSignup && (
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>

            {error && <p className="error">{error}</p>}
          </form>

          <div className="auth-toggle">
            {isSignup ? (
              <p>
                Already have an account?{' '}
                <span onClick={() => setIsSignup(false)}>Login</span>
              </p>
            ) : (
              <p>
                Don’t have an account?{' '}
                <span onClick={() => setIsSignup(true)}>Sign Up</span>
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default AuthModal;
