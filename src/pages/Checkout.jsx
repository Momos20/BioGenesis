import React, { useState } from 'react'
import axios from 'axios';
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { setUserID } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
const Checkout = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.handleCart);
  const navigate = useNavigate();
  const setMessage = useState('')[1];
  const options = {
    timeout: 10000 // 10 segundos en milisegundos
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const representative = formData.get('representative').trim();
    const email = formData.get('email').trim();
    const address = formData.get('address').trim();
    const optional = formData.get('optional').trim();
    const country = formData.get('country').trim();
    const state = formData.get('state').trim();
    const zip = formData.get('zip').trim();
  
    // Verificar si los campos obligatorios están vacíos
    if (!representative || !email || !address || !country || !state || !zip) {
      setMessage('All fields are required ');
      return;
    }
  
    // Insertar los datos en la base de datos
    const data = { representative, email, address, optional, country, state, zip, id: state.userID };
    try {
      const response = await axios.post('http://localhost:5000/citas', data, options);
      setMessage(response.data);
      dispatch(setUserID(response.data.id)); // actualizar el ID del usuario en el store
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data);
      } else {
        setMessage('An error occurred while sending the form');
      }
    }
  };

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 18;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });
    return (
      <>
        <div className="container py-5">
          <div className="row my-4">
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Overvations</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products ({totalItems})<span>${Math.round(subtotal)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      IVA
                      <span>{shipping}%</span>
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
                  <form onSubmit={handleSubmit} className="needs-validation" >
                    <div className="row g-3">
                      <div className="col-12 my-1">
                        <label htmlFor="representative" className="form-label">
                          Representative
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="representative"
                          placeholder="Your name"
                          required
                          name="representative"
                        />
                        <div className="invalid-feedback">
                          Valid first name is required.
                        </div>
                      </div>

                      <div className="col-12 my-1">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="you@example.com"
                          required
                          name="email"
                        />
                        <div className="invalid-feedback">
                          Please enter a valid email address for shipping
                          updates.
                        </div>
                      </div>

                      <div className="col-12 my-1">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          placeholder="1234 Main St"
                          required
                          name="address"
                        />
                        <div className="invalid-feedback">
                          Please enter your shipping address.
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="opcional" className="form-label">
                          {" "}
                          <span className="text-muted">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="opcional"
                          placeholder="Apartment or suite"
                          name="optional"
                        />
                      </div>

                      <div className="col-md-5 my-1">
                        <label htmlFor="country" className="form-label">
                          Country
                        </label>
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          id="country"
                          placeholder="Colombia"
                          name="country"
                          required
                        />
                        <div className="invalid-feedback">
                          Please select a valid country.
                        </div>
                      </div>

                      <div className="col-md-4 my-1">
                        <label htmlFor="state" className="form-label">
                          State
                        </label>
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          id="astate"
                          placeholder="Antioquia"
                          name="state"
                          required
                        />
                        <div className="invalid-feedback">
                          Please provide a valid state.
                        </div>
                      </div>

                      <div className="col-md-3 my-1">
                        <label htmlFor="zip" className="form-label">
                          Zip code
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="zip"
                          placeholder=""
                          name="zip"
                          required
                        />
                        <div className="invalid-feedback">
                          Zip code required.
                        </div>
                      </div>
                    </div>

                    <button
                      className="w-100 btn btn-primary "
                      type="submit"
                    >
                      send data
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Quote</h1>
        <hr />
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
