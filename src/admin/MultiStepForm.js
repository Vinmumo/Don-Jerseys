import React, { useState } from 'react';
import './MultiStepForm.css';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    size: '',
    stock: '',
    imageUrl: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setErrors({ ...errors, imageUrl: '' });
  };

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
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    if (validateStep()) {
      const imageData = new FormData();
      imageData.append('file', imageFile);
  
      try {
        const response = await fetch('http://127.0.0.1:5000/upload', {
          method: 'POST',
          body: imageData,
        });
  
        const imageUploadResult = await response.json();
  
        // Log the entire response to confirm
        console.log('Image upload response:', imageUploadResult);
  
        if (response.ok && imageUploadResult.image_url) {
          const imageUrl = imageUploadResult.image_url;
          console.log('Uploaded image URL:', imageUrl);
  
          // Update formData with the uploaded image URL
          const updatedFormData = { ...formData, imageUrl };
  
          // Submit product data with the updated imageUrl
          submitProductData(updatedFormData);
        } else {
          console.error('Failed to upload image or image_url missing:', imageUploadResult);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };
  
  

  const submitProductData = async (productData) => {
    try {
      const productResponse = await fetch('http://127.0.0.1:5000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (productResponse.ok) {
        setSuccessMessage('Product added successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        console.error('Error submitting product data:', await productResponse.json());
      }
    } catch (error) {
      console.error('Error submitting product data:', error);
    }
  };

  return (
    <>
      {successMessage && <div className="success-popup">{successMessage}</div>}
      
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

