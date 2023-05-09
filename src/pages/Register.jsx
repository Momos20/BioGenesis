import React, { useState } from 'react'
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';
const Register = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get('Name').trim();
        const email = formData.get('Email').trim();
        const password = formData.get('Password').trim();
      
        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
      
        // Verificar si los campos están vacíos
        if (!name || !email || !password) {
          setMessage('Todos los campos son obligatorios.');
          return;
        }
      
        // Leer el archivo .json
        const response = await axios.get('http://localhost:5000/registro');
        const users = response.data;
      
        // Buscar si el correo electrónico ya está registrado
        const user = users.find(u => u.email === email);
        if (user) {
          setMessage('El correo electrónico ya está registrado.');
          return;
        }
      
        // Insertar los datos en la base de datos
        const data = { name, email, password: hashedPassword };
        try {
          const response = await axios.post('http://localhost:5000/registro', data);
          setMessage(response.data);
          navigate('/login');
        } catch (error) {
          if (error.response && error.response.data) {
            setMessage(error.response.data);
          } else {
            setMessage('Ha ocurrido un error al enviar el formulario.');
          }
        }
      };

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div class="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div class="form my-3">
                                <label for="Name">Full Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="Name"
                                    name="Name"
                                    placeholder="Enter Your Name"
                                />
                            </div>
                            <div class="form my-3">
                                <label for="Email">Email address</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="Email"
                                    name="Email"
                                    placeholder="name@example.com"
                                />
                            </div>
                            <div class="form  my-3">
                                <label for="Password">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="Password"
                                    name="Password"
                                    placeholder="Password"
                                />
                            </div>
                            {message && <div className="my-3 alert alert-success">{message}</div>}
                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button class="my-2 mx-auto btn btn-dark" type="submit">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register