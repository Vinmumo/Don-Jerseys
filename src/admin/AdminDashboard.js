import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import MultiStepForm from './MultiStepForm';

const AdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [categoryCounts, setCategoryCounts] = useState([]); // Array instead of object
  const [activeCategory, setActiveCategory] = useState(null);
  const [products, setProducts] = useState([]);

  const handleFormToggle = () => {
    setShowForm(!showForm);
  };

  // Fetch product counts by category
  useEffect(() => {
    fetch('http://127.0.0.1:5000/products/count-by-category')
      .then((response) => response.json())
      .then((data) => setCategoryCounts(data))
      .catch((error) => console.error('Error fetching category counts:', error));
  }, []);

  // Fetch products by category when a category is clicked
  const handleCategoryClick = (categoryId) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
      setProducts([]);
    } else {
      setActiveCategory(categoryId);
      fetch(`http://127.0.0.1:5000/products/by-category/${categoryId}`)
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error('Error fetching products:', error));
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="dashboard-section">
        <h2>Manage Products</h2>
        <p>Here you can add, edit, or remove sportswear and gym equipment.</p>

        <button className="toggle-form-btn" onClick={handleFormToggle}>
          {showForm ? 'Hide Form' : 'Add New Product'}
        </button>

        {showForm && (
          <div className="product-form-section">
            <MultiStepForm />
          </div>
        )}

        <div className="product-table-section">
          <h3>Current Products by Category</h3>
          <div className="category-buttons">
            {categoryCounts.map((category) => (
              <button
                key={category.category_id}
                className={`category-btn ${activeCategory === category.category_id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.category_id)}
              >
                {category.category_name}: {category.count} items
              </button>
            ))}
          </div>

          {activeCategory && (
            <div className="product-table">
              <h3>Products in Category</h3>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{product.price}</td>
                      <td>{product.stock}</td>
                      <td>
                        <img src={product.image_url} alt={product.name} style={{ width: '50px' }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
