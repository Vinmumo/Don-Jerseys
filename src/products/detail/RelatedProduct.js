import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './RelatedProduct.css'; 

function RelatedProduct({ keyword, currentProductId, percentOff }) {
  const [relatedJerseys, setRelatedJerseys] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/products')
      .then(response => response.json())
      .then(data => {
        // Filter products that have the same name pattern, excluding the current product
        const filteredProducts = data.filter(
          (jersey) =>
            jersey.name.toLowerCase().includes(keyword) &&
            jersey.id !== currentProductId // Exclude the current product by id
        );

        // Ensure there are no duplicate types (home, away, third)
        const uniqueJerseys = [];
        const seenTypes = new Set();

        filteredProducts.forEach(jersey => {
          if (!seenTypes.has(jersey.type)) {
            uniqueJerseys.push(jersey);
            seenTypes.add(jersey.type);
          }
        });

        setRelatedJerseys(uniqueJerseys);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [keyword, currentProductId]);

  return (
    <>
      {relatedJerseys.map((jersey) => (
        <div className="col" key={jersey.id}>
          <div className="card shadow-sm">
            <img
              className="card-img-top cover"
              alt={jersey.name}
              src={jersey.image_url}
            />
            <div className="card-body">
              <h5 className="card-title text-center">{jersey.name}</h5>
              <p className="card-text text-center text-muted">
                {jersey.price} Ks
              </p>
              <div className="d-grid gap-2">
                <Link
                  to={{
                    pathname: `/products/${jersey.id}`,
                    state: {
                      image: jersey.image_url,
                      name: jersey.name,
                      price: jersey.price,
                      description: jersey.description,
                    },
                  }}
                  className="btn btn-outline-dark"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default RelatedProduct;
