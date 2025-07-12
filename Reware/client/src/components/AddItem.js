import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    tags: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in");

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await axios.post('http://localhost:5000/api/clothing/add', data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Item added successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Error uploading item:', err);
      alert('Error uploading item');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>➕ Add New Clothing Item</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required /><br /><br />
        <textarea name="description" placeholder="Description" onChange={handleChange} required /><br /><br />
        <input type="text" name="category" placeholder="Category" onChange={handleChange} required /><br /><br />
        <input type="text" name="type" placeholder="Type (e.g. shirt, pants)" onChange={handleChange} required /><br /><br />
        <input type="text" name="size" placeholder="Size" onChange={handleChange} required /><br /><br />
        <input type="text" name="condition" placeholder="Condition (e.g. new, gently used)" onChange={handleChange} required /><br /><br />
        <input type="text" name="tags" placeholder="Tags (comma-separated)" onChange={handleChange} /><br /><br />
        <input type="file" name="image" accept="image/*" onChange={handleChange} required /><br /><br />
        <button type="submit">Upload Item</button>
      </form>
    </div>
  );
};

export default AddItem;