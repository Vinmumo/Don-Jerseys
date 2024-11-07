import React, { useContext } from 'react';
import CartContext from '../CartContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDetailsHeader from '../products/detail/ProductDetailsHeader';

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  function handleOrderClick() {
    if (cart.length === 0) {
      alert("Your cart is empty. Add items before proceeding.");
      return;
    }
    navigate("/order-form", { state: { cart, cartTotal } });
  }

  const cartTotal = cart.reduce((total, item) => total + item.quantity * item.price, 0);
  

  return (
    <>
      <ProductDetailsHeader />
      {/* Apply background color to the entire page */}
      <div style={{ backgroundColor: '#ffecd1', minHeight: '100vh', paddingTop: '60px' }}>
        <div className="container my-4">
          <header className="d-flex justify-content-between align-items-center border-bottom pb-3">
            <h2 className="font-weight-bold">Your Cart</h2>
            <button className="btn btn-warning text-dark px-4">
              Cart ({cart.length})
            </button>
          </header>

          {cart.length > 0 ? (
            <>
              <div className="list-group my-3">
                {cart.map((item, index) => 
                (
                  <div 
                    key={index} 
                    className="list-group-item p-3 d-flex align-items-start gap-4 border-0"
                    style={{
                      border: '1px solid #ddd',  // Add border to make it look like a card
                      borderRadius: '8px',        // Rounded corners
                      backgroundColor: '#ffffff'  // White background for each card
                    }}
                  >
                    <div className="col-2">
                      <img src={item.image_url} alt={item.name} className="img-fluid rounded" />
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="mb-1">{item.name}</h5>
                      <p className="text-muted mb-0">Price: Ksh {item.price.toFixed(2)} </p>
                      <p className="text-muted mb-0">Edition: {item.edition}</p>
                      <p className="text-muted mb-0">Size: {item.size}</p>
                      <p className="text-muted mb-0">Badge: {item.badge}</p>
                      {item.customName && (
                        <p className="text-muted mb-0">Custom Name: {item.customName}</p>
                      )}
                      {item.customNumber && (
                        <p className="text-muted mb-0">Custom Number: {item.customNumber}</p>
                      )}
                      <p className="text-muted mb-0">Font Type: {item.fontType}</p>
                    </div>
                    <button
                      className="btn btn-outline-danger btn-sm ms-auto"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <h4>Order Summary</h4>
                <div className="d-flex justify-content-between border-top pt-2">
                  <span>Total</span>
                  <span>Ksh {cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-3 d-flex gap-2">
                <button
                  className="btn btn-outline-secondary flex-grow-1"
                  onClick={() => navigate("/products")}
                >
                  Continue Shopping
                </button>
                <button
                  className="btn btn-warning flex-grow-1"
                  onClick={handleOrderClick}
                >
                  Order Now
                </button>
              </div>
            </>
          ) : (
            <p className="mt-4">Your cart is empty.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
