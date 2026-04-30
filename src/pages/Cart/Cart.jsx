import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Footer, Navbar } from '../../components';
import { addCart, delCart } from '../../redux/action';

const Cart = () => {
  const cartItems = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const addItem = (product) => {
    dispatch(addCart(product));
  };

  const removeItem = (product) => {
    dispatch(delCart(product));
  };

  const EmptyCart = () => (
    <div className="container">
      <div className="row">
        <div className="col-md-12 py-5 bg-light text-center">
          <h4 className="p-3 display-5">Your Cart is Empty</h4>
          <Link to="/" className="btn btn-outline-dark mx-4">
            <i className="fa fa-arrow-left" /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  const ShowCart = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const iva = 18;

    return (
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Item List</h5>
                </div>
                <div className="card-body">
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <div className="row d-flex align-items-center">
                        <div className="col-lg-3 col-md-12">
                          <div className="bg-image rounded" data-mdb-ripple-color="light">
                            <img src={item.image} alt={item.title} width={100} height={75} />
                          </div>
                        </div>

                        <div className="col-lg-5 col-md-6">
                          <p>
                            <strong>{item.title}</strong>
                          </p>
                        </div>

                        <div className="col-lg-4 col-md-6">
                          <div className="d-flex mb-4" style={{ maxWidth: '300px' }}>
                            <button className="btn px-3" type="button" onClick={() => removeItem(item)}>
                              <i className="fa fa-minus" />
                            </button>
                            <p className="mx-5">{item.qty}</p>
                            <button className="btn px-3" type="button" onClick={() => addItem(item)}>
                              <i className="fa fa-plus" />
                            </button>
                          </div>

                          <p className="text-start text-md-center">
                            <strong>
                              <span className="text-muted">{item.qty}</span> x ${item.price}
                            </strong>
                          </p>
                        </div>
                      </div>
                      <hr className="my-4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-4">
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

                  <Link to="/checkout" className="btn btn-dark btn-lg btn-block">
                    Agendar cita
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {cartItems.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
