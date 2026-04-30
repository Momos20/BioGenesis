import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer, Navbar } from '../../components';
import { API_ENDPOINTS } from '../../config/api';
import apiClient from '../../services/apiClient';
import { hashPassword } from '../../utils/password';

const Register = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('Name')?.trim();
    const email = formData.get('Email')?.trim();
    const password = formData.get('Password')?.trim();

    if (!name || !email || !password) {
      setMessage('Todos los campos son obligatorios.');
      return;
    }

    try {
      const usersResponse = await apiClient.get(API_ENDPOINTS.users);
      const user = usersResponse.data.find((registeredUser) => registeredUser.email === email);

      if (user) {
        setMessage('The e-mail address is already registered');
        return;
      }

      const data = { name, email, password: await hashPassword(password) };
      await apiClient.post(API_ENDPOINTS.users, data);
      setMessage('User registered successfully');
      navigate('/login');
    } catch (error) {
      setMessage(error.response?.data || 'An error occurred while sending the form');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Register</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="form my-3">
                <label htmlFor="Name">Full Name</label>
                <input type="text" className="form-control" id="Name" name="Name" placeholder="Enter Your Name" />
              </div>
              <div className="form my-3">
                <label htmlFor="Email">Email address</label>
                <input type="email" className="form-control" id="Email" name="Email" placeholder="name@example.com" />
              </div>
              <div className="form my-3">
                <label htmlFor="Password">Password</label>
                <input type="password" className="form-control" id="Password" name="Password" placeholder="Password" />
              </div>
              {message && <div className="my-3 alert alert-info">{message}</div>}
              <div className="my-3">
                <p>
                  Already has an account?{' '}
                  <Link to="/login" className="text-decoration-underline text-info">
                    Login
                  </Link>
                </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Register
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

export default Register;
