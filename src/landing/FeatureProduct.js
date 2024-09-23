import { Link } from "react-router-dom";
import './FeatureProduct.css'; // Ensure your CSS file is linked

function FeatureProduct({ image, name, team, price, id }) {
  return (
    <div className="col">
      <div className="card shadow-sm">
        <img
          className="card-img-top cover"
          alt={name}
          src={image}
        />
        <div className="card-body">
          <h5 className="card-title text-center">{name}</h5>
          <p className="card-text text-center text-muted">{price} Ks</p>
          <div className="d-grid gap-2">
          <Link to={{
                  pathname: `/products/${id}`,
                  state: { image, name, team, price, description: 'Jersey description here' }
                }}
                className="btn btn-outline-dark"
              >
                Details
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureProduct;
