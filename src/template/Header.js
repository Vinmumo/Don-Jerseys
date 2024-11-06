import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CartContext from '../CartContext'; // Ensure the correct import path
import AuthModal from '../user/AuthModal'; // Ensure the correct import path
import Modal from 'react-bootstrap/Modal';

function Header() {
  const { cart, addToCart, updateQuantity, removeFromCart } = useContext(CartContext);
  const [openedDrawer, setOpenedDrawer] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false); // For cart modal display
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]);

  const toggleDrawer = () => setOpenedDrawer(!openedDrawer);
  const openLoginModal = () => { setIsSignup(false); setShowAuthModal(true); };
  const openSignupModal = () => { setIsSignup(true); setShowAuthModal(true); };
  const closeModal = () => setShowAuthModal(false);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const toggleCartModal = () => setShowCartModal(!showCartModal);

  const handleQuantityChange = (productId, newQuantity, stock) => {
    if (newQuantity > stock) {
      alert(`You can only order up to ${stock} units.`);
    } else if (newQuantity < 1) {
      alert('Quantity must be at least 1.');
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleOrderClick = () => {
    toggleCartModal(); // Close the cart modal
    navigate("/order-form"); // Navigate to the OrderForm page
  };

  return (
    <>
      <header>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/" onClick={() => setOpenedDrawer(false)}>
              <FontAwesomeIcon icon={['fab', 'bootstrap']} className="ms-1" size="lg" />
              <span className="ms-2 h5">Don Jerseys</span>
            </Link>
            

            <div className={"navbar-collapse offcanvas-collapse " + (openedDrawer ? "open" : "")}>
              <ul className="navbar-nav me-auto mb-lg-0">
                <li className="nav-item">
                  <Link to="/products" className="nav-link" onClick={() => setOpenedDrawer(false)}>
                    Explore
                  </Link>
                </li>
              </ul>

              <div className="d-flex align-items-center">
                {/* Cart Icon with Badge */}
                <div className="position-relative me-3">
                  <button
                    type="button"
                    className="btn btn-outline-dark position-relative"
                    onClick={toggleCartModal}
                  >
                    <FontAwesomeIcon icon={['fas', 'shopping-cart']} />
                    {totalItems > 0 && (
                      <span className="badge bg-danger rounded-circle position-absolute top-0 end-0">
                        {totalItems}
                      </span>
                    )}
                  </button>
                </div>

                {/* User Icon and Auth Controls */}
                <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item dropdown">
                    <a
                      href="#"
                      className="nav-link dropdown-toggle"
                      id="userDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon icon={['fas', 'user-alt']} />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                      {user ? (
                        <>
                          <li>
                            <p className="dropdown-item">Welcome, {user.username}</p>
                          </li>
                          <li>
                            <button className="dropdown-item" onClick={handleLogout}>
                              Logout
                            </button>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <button className="dropdown-item" onClick={openLoginModal}>
                              Login
                            </button>
                          </li>
                          <li>
                            <button className="dropdown-item" onClick={openSignupModal}>
                              Sign Up
                            </button>
                          </li>
                        </>
                      )}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className="d-inline-block d-lg-none">
              <button className="navbar-toggler p-0 border-0 ms-3" type="button" onClick={toggleDrawer}>
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </nav>

        {/* Cart Modal */}
        <Modal show={showCartModal} onHide={toggleCartModal}>
          <Modal.Header closeButton>
            <Modal.Title>Your Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {cart.length > 0 ? (
              <ul className="list-group">
                {cart.map((item) => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <div>{item.name}</div>
                      <div>Price: {item.price} Ksh</div>
                      <div className="input-group mt-1">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.stock)}
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.stock)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.id)}
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
            <div className="me-auto">
              <h5>Total: {totalPrice.toFixed(2)} Ksh</h5>
            </div>
            <button className="btn btn-success" onClick={handleOrderClick}>
              Order Now
            </button>
            <button className="btn btn-secondary" onClick={toggleCartModal}>
              Close
            </button>
          </Modal.Footer>
        </Modal>

      </header>

      <AuthModal isOpen={showAuthModal} onClose={closeModal} isSignup={isSignup} />
    </>
  );
}

export default Header;
