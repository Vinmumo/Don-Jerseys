import Banner from "./Banner";
import FeatureProduct from "./FeatureProduct";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Jersey1 from "../arsenalaway.jpeg";
import Jersey2 from "../chelseaaway.jpg";
import Jersey3 from "../chelseathird.jpg";
import Jersey4 from "../liverpoolhome.jpeg";
import Jersey5 from "../mancityhome.jpg";
import Jersey6 from "../manuhome.jpg";

function Landing() {
  const products = [
    { id: 1, name: "Arsenal Away Jersey", team: "Arsenal", price: 12000, image: Jersey1 },
    { id: 2, name: "Chelsea Away Jersey",team: "Chelsea", price: 11000, image: Jersey2 },
    { id: 3, name: "Chelsea Third Kit", team: "Chelsea", price: 13000, image: Jersey3 },
    { id: 4, name: "Liverpool Home Jersey",team: "Liverpool", price: 12500, image: Jersey4 },
    { id: 5, name: "Mancity Home Jersey",team: "Manchester City", price: 14000, image: Jersey5 },
    { id: 6, name: "Manchester United Home Jersey",team: "Manchester United", price: 11500, image: Jersey6 },
  ];

  return (
    <>
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
          {products.map(product => (
            <FeatureProduct
              key={product.id}
              id={product.id}
              image={product.image}
              team={product.team}
              name={product.name}
              price={product.price}
            />
          ))}
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
    </>
  );
}

export default Landing;
