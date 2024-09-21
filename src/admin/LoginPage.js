import React, { useState } from 'react';
import './login.css';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="page-container">
      <div className="login-page">
        <div className="form">
          {isLogin ? (
            <form className="login-form">
              <h2><i className="fas fa-lock"></i> Login</h2>
              <input type="text" placeholder="Username" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Login</button>
              <p className="message">
                Not registered? <button type="button" className="toggle-btn" onClick={toggleForm}>Create an account</button>
              </p>
            </form>
          ) : (
            <form className="register-form">
              <h2><i className="fas fa-lock"></i> Register</h2>
              <input type="text" placeholder="Full Name *" required />
              <input type="text" placeholder="Username *" required />
              <input type="email" placeholder="Email *" required />
              <input type="password" placeholder="Password *" required />
              <button type="submit">Create</button>
              <p className="message">
                Already registered? <button type="button" className="toggle-btn" onClick={toggleForm}>Sign In</button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
