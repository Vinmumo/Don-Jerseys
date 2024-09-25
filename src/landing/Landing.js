import { useEffect, useState } from "react";
import Banner from "./Banner";
import FeatureProduct from "./FeatureProduct";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Header from "../template/Header";
import Footer from "../template/Footer";
import axios from 'axios';

function Landing() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the latest 6 products from the backend
    axios.get('http://127.0.0.1:5000/products?limit=6&sort=created_at_desc')
      .then(response => {
        setProducts(response.data); 
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []); // runs once on mount

  return (
    <>
      <Header />
      <ScrollToTopOnMount />
      <Banner />
      <div className="d-flex flex-column bg-white py-4">
        <p className="text-center px-5">
          We are Located at Nairobi CBD.
        </p>
        <div className="d-flex justify-content-center">
          <Link to="/products" className="btn btn-primary" replace>
            Browse products
          </Link>
        </div>
      </div>
      <h2 className="text-muted text-center mt-4 mb-3">New Arrival</h2>
      <div className="container pb-5 px-lg-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5">
          {products.length > 0 ? products.map(product => (
            <FeatureProduct
              product={product}
              key={product.id}
              id={product.id}
              image={product.image_url} 
              team={product.team}
              name={product.name}
              price={product.price}
            />
          )) : <p>Loading...</p>}
        </div>
      </div>
      <div className="d-flex flex-column bg-white py-4">
        <h5 className="text-center mb-3">Follow us on</h5>
        <div className="d-flex justify-content-center">
          <a href="!#" className="me-3">
            <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
          </a>
          <a href="!#">
            <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
          </a>
          <a href="!#" className="ms-3">
            <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Landing;
