import { Link } from "react-router-dom";
// import mancityhome from "../../mancityhome.jpg";


const jerseys = [
  { id: 1, name: "Manchester City Home Jersey", team: "Manchester City", price: 12000, image: "https://havencraft.co.ke/wp-content/uploads/2024/08/MCFC-24-25-Home-Shirt-Front-700x700-1.jpg" },
  { id: 2, name: "Manchester United Home Jersey", team: "Manchester United", price: 15000, image: "https://www.fanbase.co.ke/image/cache/catalog/17-18%20football%20season/man%20u/men/24-25/Manchester-United-Home-Football-Shirt-24-25-600x600.jpg" },
  { id: 3, name: "Arsenal Home Jersey", team: "Arsenal", price: 14000, image: "https://assets.adidas.com/images/w_1880,f_auto,q_auto/6b542a9c1b51491f9cdc9700fba1d7b3_9366/IT6140_HM30.jpg" },
  { id: 4, name: "Liverpool Home Jersey", team: "Liverpool", price: 16000, image: "https://havencraft.co.ke/wp-content/uploads/2024/08/LFC-2425-Home-1-700x700-1.jpeg" },
  { id: 5, name: "Chelsea Home Jersey", team: "Chelsea", price: 13500, image: Image },
  { id: 6, name: "Tottenham Hotspur Home Jersey", team: "Tottenham Hotspur", price: 13000, image: Image },
  { id: 7, name: "Manchester City Away Jersey", team: "Manchester City", price: 14500, image: Image },
  { id: 8, name: "Manchester United Away Jersey", team: "Manchester United", price: 15000, image: Image },
  { id: 9, name: "Arsenal Away Jersey", team: "Arsenal", price: 14000, image: Image },
  { id: 10, name: "Liverpool Away Jersey", team: "Liverpool", price: 16000, image: Image },
  { id: 11, name: "Chelsea Away Jersey", team: "Chelsea", price: 13500, image: Image },
  { id: 12, name: "Tottenham Hotspur Away Jersey", team: "Tottenham Hotspur", price: 13000, image: Image },
  { id: 13, name: "Manchester City Third Jersey", team: "Manchester City", price: 15000, image: Image }
];

function RelatedProduct({ team, percentOff }) {
  const relatedJerseys = jerseys.filter(jersey => jersey.team === team);
  const price = 10000;
  let offPrice = `${price} Ks`;

  if (percentOff && percentOff > 0) {
    offPrice = (
      <>
        <del>{price} Ks</del> {price - (percentOff * price) / 100} Ks
      </>
    );
  }

  return relatedJerseys.map((jersey) => (
    <Link
      key={jersey.id}
      to={`/products/${jersey.id}`}
      className="col text-decoration-none"
      replace
    >
      <div className="card shadow-sm">
        {percentOff && (
          <div
            className="badge bg-dim py-2 text-white position-absolute"
            style={{ top: "0.5rem", right: "0.5rem" }}
          >
            {percentOff}% OFF
          </div>
        )}
        <img
          className="card-img-top bg-dark cover"
          height="200"
          alt={jersey.name}
          src={jersey.image}
        />
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
            {jersey.name}
          </h5>
          <p className="card-text text-center text-muted">{offPrice}</p>
        </div>
      </div>
    </Link>
  ));
}

export default RelatedProduct;
