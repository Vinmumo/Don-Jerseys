import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './RelatedProduct.css'; 

function RelatedProduct({ category_id, currentProductId }) {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    console.log("Fetching related products for category:", category_id);
    console.log("Current product ID:", currentProductId);

    fetch(`http://127.0.0.1:5000/products/by-category/${category_id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch related products.');
        }
        return response.json();
      })
      .then(data => {
        // Filter out the current product
        const filteredProducts = data.filter(product => product.id !== currentProductId);
  
        // Ensure there are no duplicate types (home, away, third)
        const uniqueProducts = [];
        const seenTypes = new Set();
  
        filteredProducts.forEach(product => {
          const productType = product.name.split(" ")[1];  // Assuming type is in the name
          if (!seenTypes.has(productType)) {
            uniqueProducts.push(product);
            seenTypes.add(productType);
          }
        });
  
        setRelatedProducts(uniqueProducts);
      })
      .catch(error => {
        console.error('Error fetching related products:', error);
      });
  }, [currentProductId, category_id]);  // Run effect when currentProductId or category_id changes

  return (
    <>
      {relatedProducts.length > 0 ? (
        relatedProducts.map((product) => (
          <div className="col" key={product.id}>
            <div className="card shadow-sm">
              <img
                className="card-img-top cover"
                alt={product.name}
                src={product.image_url}
              />
              <div className="card-body">
                <h5 className="card-title text-center">{product.name}</h5>
                <h6 className="card-text text-center">{product.description}</h6>
                <p className="card-text text-center text-muted">
                  {product.price} Ksh
                </p>
                <div className="d-grid gap-2">
                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-outline-dark"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No related products found.</p>
      )}
    </>
  );
}

export default RelatedProduct;
