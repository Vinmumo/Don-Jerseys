import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import RelatedProduct from './RelatedProduct';
import CartContext from '../../CartContext';
import './ProductDetails.css';

function ProductDetail() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useContext(CartContext); 

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load product details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!product) {
    return <div className="text-center my-5">Product not found</div>;
  }

  const { name, image_url, price, description, stock } = product;

  return (
    <div className="container product-details mt-5">
      <div className="row">
        <div className="col-lg-6">
          <img src={image_url} alt={name} className="img-fluid product-image" />
        </div>
        <div className="col-lg-6">
          <h1 className="product-name">{name}</h1>
          <p className="product-price">{price} Ksh</p>
          <p className="product-description">{description}</p>

          <div className="d-grid gap-2 my-4">
            <button
              className="btn btn-dark btn-lg"
              disabled={stock <= 0}
              onClick={() => addToCart(product)}
            >
              {stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button className="btn btn-outline-secondary btn-lg">Wishlist</button>
          </div>

          <div className="stock-status">
            {stock > 0 ? (
              <span className="text-success">In Stock</span>
            ) : (
              <span className="text-danger">Out of Stock</span>
            )}
          </div>
        </div>
      </div>

      <div className="row my-5">
        <h3 className="text-center mb-4">Related Products</h3>
        <div className="col-lg-12">
          <div className="row related-products">
            <RelatedProduct keyword={name.toLowerCase()} currentProductId={id} />
          </div>
        </div>
      </div>

      <div className="row my-5">
        <h3 className="text-center mb-4">Customer Reviews</h3>
        <div className="col-lg-8 offset-lg-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Review by John Doe</h5>
              <p className="card-text">Great product! I'm very satisfied with the quality.</p>
              <p className="text-muted">Rating: ★★★★☆</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
