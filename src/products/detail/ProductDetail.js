import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import RelatedProduct from './RelatedProduct';
import CartContext from '../../CartContext';
import './ProductDetails.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [showMoreBadges, setShowMoreBadges] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [selectedEdition, setSelectedEdition] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedBadge, setSelectedBadge] = useState('');
  const [customOptions, setCustomOptions] = useState({
    printName: false,
    printNumber: false,
    fontType: '',
    nameText: '',
    numberText: '',
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/products/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch product details.');
        return response.json();
      })
      .then(data => {
        data.sizes = data.sizes ? JSON.parse(data.sizes) : [];
        console.log("Parsed Sizes:", data.sizes);  
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load product details.');
        setLoading(false);
        console.error(error);
      });
  }, [id]);

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!product) return <div className="text-center my-5">Product not found</div>;

  const { name, image_url, price, description, stock, category } = product;

  // Calculate the total price
  const additionalPrice = 
  (customOptions.printName ? 200 : 0) + 
  (customOptions.printNumber ? 200 : 0) + 
  (selectedBadge ? 100 : 0);

  const totalPrice = quantity * (price + additionalPrice);

  const handleCustomOptionChange = (option) => {
    setCustomOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleBadgeChange = (badge) => {
    setSelectedBadge(prevBadge => prevBadge === badge ? '' : badge);
  };

  const canAddToCart = selectedEdition && selectedSize && selectedBadge && customOptions.fontType;

  const badges = [
    { name: 'Europa', description: 'Europa Badge with Foundation + Ksh 100' },
    { name: 'Champions', description: 'Champions Badge with Foundation + Ksh 100' },
    { name: 'Premier League', description: 'Premier League Badge + Ksh 100' },
    { name: 'La Liga', description: 'La Liga Badge + Ksh 100' },
    { name: 'Serie A', description: 'Serie A Badge + Ksh 100' },
    { name: 'MLS', description: 'MLS Badge + Ksh 100' },
  ];

  const visibleBadges = showMoreBadges ? badges : badges.slice(0, 2);

  return (
    <div className="product-details-container">
      <div className="container product-details mt-5">
        <div className="row">
          <div className="col-lg-6">
            <div className="product-image">
              {stock === 0 && <div className="sold-out-badge">Out of Stock</div>}
              <img src={image_url} alt={name} className="img-fluid" />
            </div>
          </div>
          <div className="col-lg-6">
            <h1 className="product-name">{name}</h1>
            <p>{description}</p>

            {category?.name === 'Jerseys' && (
              <>
                <div className="selection-options mt-4">
                  <h5>* Select Kit Edition</h5>
                  {['Fan Edition', 'Player Edition'].map((edition) => (
                    <button key={edition} className={`btn btn-edition ${selectedEdition === edition ? 'selected' : ''}`} onClick={() => setSelectedEdition(edition)}>
                      {edition}
                    </button>
                  ))}

<h5 className="mt-3">* Select Size (adult)</h5>
<div className="size-options">
  {Array.isArray(product.sizes) && product.sizes.length > 0 ? (
    product.sizes.map((size) => (
      <button 
        key={size} 
        className={`btn btn-size ${selectedSize === size ? 'selected' : ''}`} 
        onClick={() => setSelectedSize(size)}
      >
        {size}
      </button>
    ))
  ) : (
    <p>No sizes available.</p>
  )}
</div>

                </div>

                <div className="badge-options mt-3">
                  <h5>Badge</h5>
                  {visibleBadges.map(badge => (
                    <label key={badge.name}>
                      <input 
                        type="radio" 
                        name="badge" 
                        checked={selectedBadge === badge.name}
                        onChange={() => handleBadgeChange(badge.name)}
                      /> 
                      {badge.description}
                    </label>
                  ))}
                  <button 
                    onClick={() => setShowMoreBadges(!showMoreBadges)} 
                    className="btn btn-link"
                  >
                    {showMoreBadges ? 'Show Less' : 'Show More'}
                  </button>
                </div>

                <div className="font-options mt-3">
                  <h5>Font Type</h5>
                  <label>
                    <input type="radio" name="fontType" value="League Font" onChange={() => setCustomOptions(prev => ({ ...prev, fontType: 'League Font' }))} /> 
                    LEAGUE FONT + Ksh 0
                  </label>
                  <label>
                    <input type="radio" name="fontType" value="Team Font" onChange={() => setCustomOptions(prev => ({ ...prev, fontType: 'Team Font' }))} /> 
                    TEAM FONT + Ksh 0
                  </label>
                </div>

                <div className="custom-options mt-3">
                  <h5>Custom</h5>
                  <label>
                    <input type="checkbox" checked={customOptions.printName} onChange={() => handleCustomOptionChange('printName')} /> 
                    PRINT NAME + Ksh 200
                    {customOptions.printName && <input type="text" placeholder="Enter Name" onChange={(e) => setCustomOptions(prev => ({ ...prev, nameText: e.target.value }))} />}
                  </label>
                  <label>
                    <input type="checkbox" checked={customOptions.printNumber} onChange={() => handleCustomOptionChange('printNumber')} /> 
                    PRINT NUMBER + Ksh 200
                    {customOptions.printNumber && <input type="text" placeholder="Enter Number" onChange={(e) => setCustomOptions(prev => ({ ...prev, numberText: e.target.value }))} />}
                  </label>
                </div>
              </>
            )}

            <p>Category: {category?.name}</p>

            <div className="quantity-selector mt-3">
              <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</button>
              <span className="quantity-display mx-2">{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>

            <div className="product-price mt-3">
              <span className="discounted-price">Total: Ksh {totalPrice}</span>
            </div>

            <div className="d-grid gap-2 my-4">
              <button 
                className="btn btn-dark btn-lg" 
                disabled={!canAddToCart || stock <= 0} 
                onClick={() => addToCart({
                  id: product.id,
                  name: product.name,
                  price: totalPrice,
                  quantity,
                  image_url: product.image_url,
                  edition: selectedEdition,
                  size: selectedSize,
                  badge: selectedBadge,
                  customName: customOptions.nameText,
                  customNumber: customOptions.numberText,
                  fontType: customOptions.fontType,
                })}
              >
                {stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="row my-5 related-products-section">
          <h3 className="text-center mb-4">Related Products</h3>
          <RelatedProduct category_id={product.category.id} currentProductId={product.id} />
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2023 Your Fashion Store. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default ProductDetail;
