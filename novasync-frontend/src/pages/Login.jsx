import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Mail, Lock, AlertCircle } from 'lucide-react';
import '../styles/Login.css'

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(form.email, form.password);
      setForm({email: "", password: "" });
      navigate("/dashboard");
    }
    catch(err)
    {
      const errMsg = err.response?.data?.message || "Something went wrong. Please try again.";
      setError(errMsg);
    }
  };

  return (
    <div className='container' >
      <h2 className="heading">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
        <input
          type="email"
          id="email"
          placeholder=""
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <label htmlFor="email">Email</label>
          <span className="ic">
            <Mail size={20}/>
          </span>
        </div>
        <div className="input-group">
        <input
          type="password"
          id="password"
          placeholder=""
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <label htmlFor="password">Password</label>
         <span className="ic">
            <Lock size={20}/>
          </span>
        </div>

        {error && (
        <div className="err-msg">
          <AlertCircle size={18}/>
          <span>{error}</span>
        </div>
      )}
      
        <button className="login-btn">Sign in</button>
      </form>
      
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};


export default Login;
