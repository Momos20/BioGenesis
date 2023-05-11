import React, { useState } from 'react'
import { Footer, Navbar } from "../components";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ContactPage = () => {
  const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get('Name').trim();
        const email = formData.get('Email').trim();
        const message= formData.get('Message').trim();
      
      
      
        // Verificar si los campos están vacíos
        if (!name || !email || !message) {
          setMessage('Todos los campos son obligatorios.');
          return;
        }
            // Insertar los datos en la base de datos
        const data = { name, email, message};
        try {
          const response = await axios.post('http://localhost:5000/contacto', data);
          setMessage(response.data);
          navigate('/login');
        } catch (error) {
          if (error.response && error.response.data) {
            setMessage(error.response.data);
          } else {
            setMessage('Ha ocurrido un error al enviar el de contacto.');
          }
        }
      };


  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Contact Us</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="form my-3">
                <label htmlFor="Name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  placeholder="Enter your name"
                  name="Name"
                />
              </div>
              <div className="form my-3">
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  placeholder="name@example.com"
                  name="Email"
                />
              </div>
              <div className="form  my-3">
                <label htmlFor="Message">Message</label>
                <textarea
                  rows={5}
                  className="form-control"
                  id="Message"
                  placeholder="Enter your message"
                  name="Message"
                />
              </div>
              <div className="text-center">
                <button
                  className="my-2 px-4 mx-auto btn btn-dark"
                  type="submit"
                >
                  Send
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

export default ContactPage;
