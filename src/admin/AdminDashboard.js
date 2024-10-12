import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MultiStepForm from './MultiStepForm';
import RegisterAdminForm from './RegisterAdminForm'; 
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false); // For toggling admin form
  const [categoryCounts, setCategoryCounts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/');
    }
  }, [navigate]);

  const handleFormToggle = () => {
    setShowForm(!showForm);
  };

  const handleAdminFormToggle = () => {
    setShowAdminForm(!showAdminForm);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  useEffect(() => {
    fetch('http://127.0.0.1:5000/products/count-by-category')
      .then((response) => response.json())
      .then((data) => setCategoryCounts(data))
      .catch((error) => console.error('Error fetching category counts:', error));
  }, []);

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
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

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

        <button className="toggle-form-btn" onClick={handleAdminFormToggle}>
          {showAdminForm ? 'Hide Admin Form' : 'Register New Admin'}
        </button>

        {showAdminForm && (
          <div className="admin-form-section">
            <RegisterAdminForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
