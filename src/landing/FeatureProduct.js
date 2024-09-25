import { Link } from "react-router-dom";
import './FeatureProduct.css'; 

function FeatureProduct({ product, image, name, price, id }) {
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
          <Link
               to={`/products/${product.id}`}
               state={{ 
                 id:product.id,
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureProduct;
