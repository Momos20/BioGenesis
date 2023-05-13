import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components";

const PageNotFound = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5 bg-light text-center">
              <h4 className="p-3 display-5">Oops! Something went wrong</h4>
              <p>To access this page you must login or register</p>
              <div className="my-4">
                <Link to="/login" className="btn btn-dark mx-2">
                Login
                </Link>
                <Link to="/register" className="btn  btn-dark mx-2">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;