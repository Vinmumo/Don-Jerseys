import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CartContext from '../../CartContext'; 
import Modal from 'react-bootstrap/Modal';

function ProductDetailsHeader() {
  const { cart, removeFromCart } = useContext(CartContext); 
  const [showCart, setShowCart] = useState(false);

  function toggleCart() {
    setShowCart(!showCart);
  }

  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          {/* Brand/Logo */}
          <Link className="navbar-brand" to="/">
            <FontAwesomeIcon icon={["fab", "bootstrap"]} className="ms-1" size="lg" />
            <span className="ms-2 h5">Don Jerseys</span>
          </Link>

          <div className="ms-auto">
            {/* Shopping Cart */}
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={toggleCart} // Open cart popup when clicked
            >
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              <span className="ms-3 badge rounded-pill bg-dark">
                {cart.length || 0}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Modal for Cart */}
      <Modal show={showCart} onHide={toggleCart}>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length > 0 ? (
            <ul className="list-group">
              {cart.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <div>{item.name}</div>
                    <div>Quantity: {item.quantity}</div>
                    <div>Price: ${item.price}</div>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(item.id)} // Remove item from cart
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success" onClick={() => alert('Order placed!')}>
            Order Now
          </button>
          <button className="btn btn-secondary" onClick={toggleCart}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </header>
  );
}

export default ProductDetailsHeader;
