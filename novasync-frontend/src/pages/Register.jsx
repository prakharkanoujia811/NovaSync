import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, AlertCircle } from 'lucide-react';
import '../styles/Register.css';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
      navigate("/dashboard");
    }
    catch (err) {
      const errMsg = err.response?.data?.message || "Something went wrong. Please try again.";
      setError(errMsg);
    }
  };

  return (
    <div className='container'>
      <h2 className='reg-heading'>Create Account</h2>
      <form onSubmit={handleSubmit} className='register-form'>
        <div className='input-group'>
          <input
            name='name'
            type="name"
            id="name"
            placeholder=''
            value={form.name}
            onChange={handleChange}
            required />
          <label htmlFor='name'>Name</label>
          <span className='ic'>
            <User size={20} />
          </span>
        </div>
        <div className='input-group'>
          <input
            name='email'
            type="email"
            id="email"
            placeholder=''
            value={form.email}
            onChange={handleChange}
            required />
          <label htmlFor='email'>Email</label>
          <span className='ic'>
            <Mail size={20} />
          </span>
        </div>
        <div className='input-group'>
          <input
            name='password'
            type="password"
            id="password"
            placeholder=''
            value={form.password}
            onChange={handleChange}
            required />
          <label htmlFor='password'>Password</label>
          <span className='ic'>
            <Lock size={20} />
          </span>
        </div>
        <div className='input-group'>
          <input
            name='phone'
            type="phone"
            id="phone"
            placeholder=''
            value={form.phone}
            onChange={handleChange} />
          <label htmlFor='phone'>Phone</label>
          <span className='ic'>
            <Phone size={20} />
          </span>
        </div>

        {error && (
          <div className="err-msg">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <button className='register-btn' type='submit'>Register</button>
      </form>

      <p>
        Already registered? <Link to='/login'>Login</Link>
      </p>
    </div>
  );
};

export default Register;