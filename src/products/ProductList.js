import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import Header from "../template/Header";
import "./Productlist.css"

function FilterMenuLeft({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <ul className="list-group list-group-flush rounded">
      <li className="list-group-item d-none d-lg-block">
        <h5 className="mt-1 mb-2">Browse by Category</h5>
        <div className="d-flex flex-wrap my-2">
          {categories.map((category, i) => (
            <button
              key={i}
              className={`btn btn-sm btn-outline-dark rounded-pill me-2 mb-2 ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </li>
    </ul>
  );
}

function ProductList() {
  const [viewType, setViewType] = useState({ grid: true });
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(["All Products", "Jerseys", "Sportswear", "Gym Equipment"]);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products 
  useEffect(() => {
    fetch("http://127.0.0.1:5000/products") 
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        // console.log(data);
        setFilteredProducts(data); // Set filtered products initially to all products
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Filter products based on the selected category
  useEffect(() => {
    if (selectedCategory === "All Products") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  // Filter products based on the search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else if (selectedCategory !== "All Products") {
      const filtered = products.filter((product) =>
        product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, selectedCategory, products]);

  function changeViewType() {
    setViewType({
      grid: !viewType.grid,
    });
  }

  return (
    <>
      <Header />
      <div className="container-full-width">
        <div className="main-content-container mt-5 py-4 px-xl-5">
          <ScrollToTopOnMount />
  
          {/* Filter Menu for Categories */}
          <div className="row mb-4 mt-lg-3">
            <div className="col-lg-3 d-none d-lg-block">
              <div className="border rounded shadow-sm">
                <FilterMenuLeft
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>
            </div>
  
            {/* Main Product Listing */}
            <div className="col-lg-9">
              <div className="d-flex flex-column h-100">
                {/* Search and View Type Controls */}
                <div className="row mb-3">
                  <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                    <div className="input-group">
                      <input
                        className="form-control bg-orange"
                        type="text"
                        placeholder="Search products..."
                        aria-label="search input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button className="btn btn-outline-dark">
                        <FontAwesomeIcon icon={["fas", "search"]} />
                      </button>
                    </div>
                    <button
                      className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                      onClick={changeViewType}
                    >
                      <FontAwesomeIcon
                        icon={["fas", viewType.grid ? "th-list" : "th-large"]}
                      />
                    </button>
                  </div>
                </div>
  
                {/* Product Cards */}
                <div
                  className={
                    "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 " +
                    (viewType.grid ? "row-cols-xl-3" : "row-cols-xl-2")
                  }
                >
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div key={product.id} className="col">
                        <div className="card shadow-sm">
                          <img
                            className="card-img-top cover"
                            alt={product.name}
                            src={product.image_url}
                          />
                          <div className="card-body">
                            <h5 className="card-title text-center">
                              {product.name}
                            </h5>
                            <p className="card-text text-center text-muted">
                              {product.price} Ks
                            </p>
                            <div className="d-grid gap-2">
                              <Link
                                to={`/products/${product.id}`}
                                state={{
                                  id: product.id,
                                  name: product.name,
                                  image: product.image_url,
                                  price: product.price,
                                  description: product.description,
                                  team: product.team,
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
                    ))
                  ) : (
                    <p className="text-center">No products available.</p>
                  )}
                </div>
  
                {/* Pagination (if needed) */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;
