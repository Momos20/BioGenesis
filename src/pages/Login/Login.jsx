import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer, Navbar } from '../../components';
import { API_ENDPOINTS } from '../../config/api';
import apiClient from '../../services/apiClient';
import { validatePassword } from '../../utils/password';

const Login = ({ onLogin }) => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('Email')?.trim();
    const password = formData.get('Password')?.trim();

    if (!email || !password) {
      setMessage('Email and password are required');
      return;
    }

    try {
      const response = await apiClient.get(API_ENDPOINTS.users);
      const user = response.data.find((registeredUser) => registeredUser.email === email);

      if (!user || !(await validatePassword(password, user.password))) {
        setMessage('Invalid credentials');
        return;
      }

      localStorage.setItem('userID', user.id);
      onLogin?.();
      setMessage('Successful login.');
      navigate('/');
    } catch (error) {
      setMessage(error.response?.data || 'An error occurred while logging in');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="Email">Email address</label>
                <input type="email" className="form-control" id="Email" name="Email" placeholder="name@example.com" />
              </div>
              <div className="my-3">
                <label htmlFor="Password">Password</label>
                <input type="password" className="form-control" id="Password" name="Password" placeholder="Password" />
              </div>
              {message && <div className="my-3 alert alert-info">{message}</div>}

              <div className="my-3">
                <p>
                  New Here?{' '}
                  <Link to="/register" className="text-decoration-underline text-info">
                    Register
                  </Link>
                </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
