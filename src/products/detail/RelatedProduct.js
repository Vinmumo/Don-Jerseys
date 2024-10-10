import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './RelatedProduct.css'; 

function RelatedProduct({ category_id, currentProductId }) {
  const [relatedJerseys, setRelatedJerseys] = useState([]);

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
        const filteredProducts = data.filter(jersey => jersey.id !== currentProductId);
  
        // Ensure there are no duplicate types (home, away, third)
        const uniqueJerseys = [];
        const seenTypes = new Set();
  
        filteredProducts.forEach(jersey => {
          const jerseyType = jersey.name.split(" ")[1];  // Assuming type is in the name, e.g., "Arsenal Home Kit"
          if (!seenTypes.has(jerseyType)) {
            uniqueJerseys.push(jersey);
            seenTypes.add(jerseyType);
          }
        });
  
        setRelatedJerseys(uniqueJerseys);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [currentProductId, category_id]);  // Use category_id for filtering

  return (
    <>
      {relatedJerseys.length > 0 ? (
        relatedJerseys.map((jersey) => (
          <div className="col" key={jersey.id}>
            <div className="card shadow-sm">
              <img
                className="card-img-top cover"
                alt={jersey.name}
                src={jersey.image_url}
              />
              <div className="card-body">
                <h5 className="card-title text-center">{jersey.name}</h5>
                <h6 className="card-text text-center">{jersey.description}</h6>
                <p className="card-text text-center text-muted">
                  {jersey.price} Ksh
                </p>
                <div className="d-grid gap-2">
                  <Link
                    to={`/products/${jersey.id}`}
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
