import { useLocation } from "react-router-dom";
import RelatedProduct from "./RelatedProduct";
import Ratings from "react-ratings-declarative";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";
import { Link } from "react-router-dom";

const iconPath = "M18.571 7.221c0 0.201-0.145 0.391-0.29 0.536l-4.051 3.951 0.96 5.58c0.011 0.078 0.011 0.145 0.011 0.223 0 0.29-0.134 0.558-0.458 0.558-0.156 0-0.313-0.056-0.446-0.134l-5.011-2.634-5.011 2.634c-0.145 0.078-0.29 0.134-0.446 0.134-0.324 0-0.469-0.268-0.469-0.558 0-0.078 0.011-0.145 0.022-0.223l0.96-5.58-4.063-3.951c-0.134-0.145-0.279-0.335-0.279-0.536 0-0.335 0.346-0.469 0.625-0.513l5.603-0.815 2.511-5.078c0.1-0.212 0.29-0.458 0.547-0.458s0.446 0.246 0.547 0.458l2.511 5.078 5.603 0.815c0.268 0.045 0.625 0.179 0.625 0.513z";


function ProductDetail() {
  const location = useLocation();
  const { image, name, price, description, team } = location.state || {}; // Fallback to an empty object if no state

  function changeRating(newRating) {}

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
        <ol className="breadcrumb p-3">
          <li className="breadcrumb-item">
            <Link className="text-decoration-none link-secondary" to="/products">
              All Products
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {name || "Product Name"} {/* Use dynamic name */}
          </li>
        </ol>
      </nav>

      <div className="row mb-4">
        <div className="col-lg-6">
          <img className="border rounded ratio ratio-1x1" alt={name} src={image} />
        </div>

        <div className="col-lg-5">
          <div className="d-flex flex-column h-100">
            <h2 className="mb-1">{name}</h2>
            <h4 className="text-muted mb-4">{price} Ks</h4>

            <div className="row g-3 mb-4">
              <div className="col">
                <button className="btn btn-outline-dark py-2 w-100">
                  Add to cart
                </button>
              </div>
              <div className="col">
                <button className="btn btn-dark py-2 w-100">Buy now</button>
              </div>
            </div>

            <h4 className="mb-0">Details</h4>
            <hr />
            <dl className="row">
              <dt className="col-sm-4">Category</dt>
              <dd className="col-sm-8 mb-3">Jersey</dd>

              <dt className="col-sm-4">Brand</dt>
              <dd className="col-sm-8 mb-3">Sports Brand</dd>

              <dt className="col-sm-4">Status</dt>
              <dd className="col-sm-8 mb-3">In stock</dd>

              <dt className="col-sm-4">Rating</dt>
              <dd className="col-sm-8 mb-3">
                <Ratings
                  rating={4.5}
                  widgetRatedColors="rgb(253, 204, 13)"
                  changeRating={changeRating}
                  widgetSpacings="2px"
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <Ratings.Widget
                      key={i}
                      widgetDimension="20px"
                      svgIconViewBox="0 0 19 20"
                      svgIconPath={iconPath}
                    />
                  ))}
                </Ratings>
              </dd>
            </dl>

            <h4 className="mb-0">Description</h4>
            <hr />
            <p className="lead flex-shrink-0">
              <small>{description}</small>
            </p>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="row">
        <div className="col-md-12 mb-4">
          <hr />
          <h4 className="text-muted my-4">Related products</h4>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
            {/* Pass the team dynamically to RelatedProduct */}
            <RelatedProduct team={team} percentOff={15} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
