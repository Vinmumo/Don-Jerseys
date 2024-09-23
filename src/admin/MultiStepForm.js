import React, { useState } from 'react';
import './MultiStepForm.css';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    stock: '',
    imageUrl: ''
  });
  const [imageFile, setImageFile] = useState(null); // For storing the selected image file
  const [errors, setErrors] = useState({}); // For storing error messages
  const [successMessage, setSuccessMessage] = useState(''); // State to control success message

  // Handle input change
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error for the field when it changes
  };

  // Handle image file change
  const handleImageChange = e => {
    setImageFile(e.target.files[0]);
    setErrors({ ...errors, imageUrl: '' });
  };

  // Validate the current step
  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name) newErrors.name = 'Product name is required';
      if (!formData.description) newErrors.description = 'Product description is required';
    } else if (step === 2) {
      if (!formData.price || formData.price <= 0) newErrors.price = 'Price must be a positive number';
      if (!formData.stock || formData.stock < 0) newErrors.stock = 'Stock cannot be negative';
    } else if (step === 3) {
      if (!formData.category_id) newErrors.category_id = 'Category is required';
      if (!imageFile) newErrors.imageUrl = 'Product image is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle next step
  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  // Handle previous step
  const prevStep = () => setStep(step - 1);

  // Form submit handler
  const handleSubmit = async () => {
    if (validateStep()) {
      // Create form data for image upload
      const imageData = new FormData();
      imageData.append('file', imageFile);

      try {
        // Upload image to Cloudinary
        const response = await fetch('http://127.0.0.1:5000/upload', {
          method: 'POST',
          body: imageData,
        });

        const imageUploadResult = await response.json();

        if (response.ok) {
          // Add image URL from Cloudinary to formData
          const imageUrl = imageUploadResult.secure_url;
          const productData = { ...formData, imageUrl };

          const productResponse = await fetch('http://127.0.0.1:5000/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
          });

          if (productResponse.ok) {
            setSuccessMessage('Product added successfully!'); // Show success message
            setTimeout(() => {
              window.location.reload(); // Refresh the page after 3 seconds
            }, 3000);
          }
        } else {
          console.error('Failed to upload image:', imageUploadResult);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <>
      {successMessage && <div className="success-popup">{successMessage}</div>} {/* Success popup */}
      
      {step === 1 && (
        <div className="form-container">
          <h2>Step 1: Product Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
          <input
            type="text"
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <p className="error">{errors.description}</p>}
          <button onClick={nextStep}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div className="form-container">
          <h2>Step 2: Pricing and Stock</h2>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <p className="error">{errors.price}</p>}
          <input
            type="number"
            name="stock"
            placeholder="Quantity"
            value={formData.stock}
            onChange={handleChange}
          />
          {errors.stock && <p className="error">{errors.stock}</p>}
          <button onClick={prevStep}>Back</button>
          <button onClick={nextStep}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div className="form-container">
          <h2>Step 3: Category and Image</h2>
          <input
            type="number"
            name="category_id"
            placeholder="Category id: 1-Jersey 2-Sportswear 3-Gym Equipment"
            value={formData.category_id}
            onChange={handleChange}
          />
          {errors.category_id && <p className="error">{errors.category_id}</p>}
          <input type="file" onChange={handleImageChange} />
          {errors.imageUrl && <p className="error">{errors.imageUrl}</p>}
          <button onClick={prevStep}>Back</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </>
  );
};

export default MultiStepForm;
