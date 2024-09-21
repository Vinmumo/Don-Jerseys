import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="dashboard-section">
        <h2>Manage Products</h2>
        <p>Here you can add, edit, or remove sportswear and gym equipment.</p>
        
        {/* Multi-form space for managing products */}
        <div className="product-form-section">
          <h3>Add New Product</h3>
          {/*  multi-form component here */}
        </div>

        <div className="product-table-section">
          <h3>Current Products</h3>
          {/* table to display the list of products */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
