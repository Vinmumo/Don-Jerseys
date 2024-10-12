import { useState } from 'react';
import axios from 'axios';

const OrderForm = ({ cart }) => {
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails({ ...deliveryDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/orders', {
        cart,
        delivery_details: deliveryDetails
      });
      console.log(response.data);
      alert('Order placed successfully!');
    } catch (error) {
      console.error(error);
      alert('Order placement failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Delivery Details</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={deliveryDetails.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={deliveryDetails.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={deliveryDetails.phone}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Delivery Location:</label>
        <input
          type="text"
          name="location"
          value={deliveryDetails.location}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Place Order</button>
    </form>
  );
};

export default OrderForm;
