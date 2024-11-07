import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './MultiStepForm.css';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    sizes: '', // stores sizes as comma-separated string
    stock: '',
    imageUrl: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

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
      if (!formData.sizes) newErrors.sizes = 'Size(s) are required';
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
  
        if (response.ok && imageUploadResult.image_url) {
          const imageUrl = imageUploadResult.image_url;
  
          // Convert sizes from string to array (split by commas and trim spaces)
          const sizesArray = formData.sizes.split(',').map(size => size.trim());
  
          // Update formData with the imageUrl and sizesArray
          const updatedFormData = { ...formData, imageUrl, sizes: sizesArray };
  
          // Submit the updated product data
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
        Swal.fire({
          icon: 'success',
          title: 'Product Added Successfully!',
          text: 'The product has been added to the catalog.',
          showConfirmButton: true,
          confirmButtonText: 'OK'
        }).then(() => {
          window.location.reload();
        });
      } else {
        const errorData = await productResponse.json();
        console.error('Error submitting product data:', errorData);
        Swal.fire({
          icon: 'error',
          title: 'Failed to Add Product',
          text: 'Please check the entered details and try again.',
          showConfirmButton: true,
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error submitting product data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Error',
        text: 'An error occurred while submitting the product. Please try again later.',
        showConfirmButton: true,
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <>
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
          <input
            type="text"
            name="sizes"
            placeholder="Enter size (e.g., S, M, L, 42)"
            value={formData.sizes}
            onChange={handleChange}
          />
          {errors.sizes && <p className="error">{errors.sizes}</p>}
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
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
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
