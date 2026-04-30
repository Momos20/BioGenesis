import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Footer, Navbar } from '../../components';
import { API_ENDPOINTS } from '../../config/api';
import apiClient from '../../services/apiClient';

const Checkout = () => {
  const cartItems = useSelector((state) => state.handleCart);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const representative = formData.get('representative')?.trim();
    const email = formData.get('email')?.trim();
    const address = formData.get('address')?.trim();
    const optional = formData.get('optional')?.trim();
    const country = formData.get('country')?.trim();
    const department = formData.get('state')?.trim();
    const zip = formData.get('zip')?.trim();
    const userId = localStorage.getItem('userID');

    if (!representative || !email || !address || !country || !department || !zip) {
      setMessage('All fields are required');
      return;
    }

    const data = {
      representative,
      email,
      address,
      optional,
      country,
      state: department,
      zip,
      userId,
      products: cartItems.map((item) => ({ id: item.id, title: item.title, qty: item.qty, price: item.price })),
    };

    try {
      await apiClient.post(API_ENDPOINTS.appointments, data);
      setMessage('Appointment created successfully');
      navigate('/');
    } catch (error) {
      setMessage(error.response?.data || 'An error occurred while sending the form');
    }
  };

  const EmptyCart = () => (
    <div className="container">
      <div className="row">
        <div className="col-md-12 py-5 bg-light text-center">
          <h4 className="p-3 display-5">No item in Cart</h4>
          <Link to="/" className="btn btn-outline-dark mx-4">
            <i className="fa fa-arrow-left" /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  const ShowCheckout = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const iva = 18;

    return (
      <div className="container py-5">
        <div className="row my-4">
          <div className="col-md-5 col-lg-4 order-md-last">
            <div className="card mb-4">
              <div className="card-header py-3 bg-light">
                <h5 className="mb-0">Observations</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products ({totalItems})<span>${Math.round(subtotal)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    IVA
                    <span>{iva}%</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Price without IVA</strong>
                    </div>
                    <span>
                      <strong>${Math.round(subtotal)}</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-7 col-lg-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h4 className="mb-0">Schedule your appointment</h4>
              </div>
              <div className="card-body">
                {message && <div className="alert alert-info">{message}</div>}
                <form onSubmit={handleSubmit} className="needs-validation">
                  <div className="row g-3">
                    <div className="col-12 my-1">
                      <label htmlFor="representative" className="form-label">
                        Representative
                      </label>
                      <input type="text" className="form-control" id="representative" placeholder="Your name" required name="representative" />
                    </div>

                    <div className="col-12 my-1">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input type="email" className="form-control" id="email" placeholder="you@example.com" required name="email" />
                    </div>

                    <div className="col-12 my-1">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <input type="text" className="form-control" id="address" placeholder="1234 Main St" required name="address" />
                    </div>

                    <div className="col-12">
                      <label htmlFor="optional" className="form-label">
                        <span className="text-muted">Apartment or suite optional</span>
                      </label>
                      <input type="text" className="form-control" id="optional" placeholder="Apartment or suite" name="optional" />
                    </div>

                    <div className="col-md-5 my-1">
                      <label htmlFor="country" className="form-label">
                        Country
                      </label>
                      <input type="text" className="form-control" id="country" placeholder="Colombia" name="country" required />
                    </div>

                    <div className="col-md-4 my-1">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <input type="text" className="form-control" id="state" placeholder="Antioquia" name="state" required />
                    </div>

                    <div className="col-md-3 my-1">
                      <label htmlFor="zip" className="form-label">
                        Zip code
                      </label>
                      <input type="text" className="form-control" id="zip" name="zip" required />
                    </div>
                  </div>

                  <button className="w-100 btn btn-primary mt-3" type="submit">
                    Send data
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Quote</h1>
        <hr />
        {cartItems.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
