import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
export default function Navbar() {
      const [cartView, setCartView] = useState(false)
      let data=useCart();
  const navigate= useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem("authToken");
    navigate("/login")
  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-success">
        <div class="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav me-auto mb-2">
              <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              {(localStorage.getItem("authToken")) ?
                <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                : ""}
            </div>
            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>
                <Link className="nav-link btn  bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="nav-link btn  bg-white text-success mx-1" to="/createuser">Signup</Link>
              </div>
              :
              <div>
                <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>
                  My Cart{" "}
                  <Badge pill bg="danger"> {data.length} </Badge>
                </div>
                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                  LogOut
                </div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
