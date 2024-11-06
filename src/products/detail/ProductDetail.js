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
    // Fetch product details by product id
    fetch(`http://127.0.0.1:5000/products/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch product details.');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load product details.');
        setLoading(false);
        console.error(error);
      });
  }, [id]);

  // Show loading state
  if (loading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  // Show error state
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  // Handle case where product is not found
  if (!product) {
    return <div className="text-center my-5">Product not found</div>;
  }

  // Destructure product details
  const { name, image_url, price, description, stock, category } = product;
  const category_id = category.id; // Access category id correctly

  return (
    <div className="product-details-container">
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

        <div className="row my-5 related-products-container">
          <h3 className="text-center mb-4">Related Products</h3>
          <div className="col-lg-12">
            <div className="row related-products">
              {category_id ? (
                <RelatedProduct category_id={category_id} currentProductId={product.id} />
              ) : (
                <p className="text-center">No related products available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
