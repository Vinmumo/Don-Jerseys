import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import './FeatureProduct.css';
import CartContext from '../CartContext'; // Import CartContext

function FeatureProduct({ product, image, name, price, id }) {
  const { addToCart } = useContext(CartContext); // Access addToCart from context

  const handleAddToCart = () => {
    addToCart(product, 1); // Call addToCart with the current product and a default quantity of 1
  };

  return (
    <div className="col">
      <div className="card shadow-sm hover-effect">
        <Link to={`/products/${id}`} state={{ 
          id: product.id,
          name: product.name,
          image: product.image_url,
          price: product.price,
          description: product.description,
          team: product.team 
        }}>
          <img
            className="card-img-top cover"
            alt={name}
            src={image}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title text-center">{name}</h5>
          <p className="card-text text-center text-muted">{price} Ks</p>
          <div className="d-grid gap-2">
            <Link
              to={`/products/${id}`}
              state={{ 
                id: product.id,
                name: product.name,
                image: product.image_url,
                price: product.price,
                description: product.description,
                team: product.team 
              }}
              className="btn btn-outline-dark"
              replace
            >
              Details
            </Link>
            <button
              onClick={handleAddToCart}
              className="btn btn-primary mt-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureProduct;
