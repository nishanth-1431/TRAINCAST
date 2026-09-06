import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import IRLogo from '../../assets/logos/indian_railways_logo.png';
import './auth.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('CONTROL_ROOM');

  const handleLogin = (e) => {
    e.preventDefault();
    login(role);
    navigate('/control/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src={IRLogo} alt="Indian Railways" style={{ height: '60px', width: 'auto', marginBottom: 'var(--space-2)' }} />
          <h2>TrainCast Access</h2>
          <p className="text-muted text-sm">Enterprise Authentication Portal</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Username / Email</label>
            <input type="text" className="form-input" placeholder="operator@railnet.gov.in" required />
          </div>
          
          <div className="form-group mt-2">
            <label>Password</label>
            <input type="password" className="form-input" placeholder="••••••••" required />
          </div>

          <div className="form-group mt-2">
            <label>Select Role (Demo only)</label>
            <select className="form-input" value={role} onChange={e => setRole(e.target.value)}>
              <option value="CONTROL_ROOM">Control Room Operator</option>
              <option value="ANALYST">Analyst</option>
              <option value="ADMIN">System Admin</option>
            </select>
          </div>

          <div className="form-options mt-2">
            <label className="flex items-center gap-1 text-sm">
              <input type="checkbox" /> Remember device
            </label>
            <a href="#" className="text-sm">Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-3">
            Sign In
          </button>
        </form>

        <div className="login-footer mt-3">
          <div className="divider"><span>OR</span></div>
          <button className="btn btn-secondary w-full mt-2" type="button">
            Sign in with Identity Provider
          </button>
          <p className="text-xs text-center text-muted mt-3">
            OAuth 2.0 / OpenID Connect compatible authentication
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
