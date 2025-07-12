import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    tags: '',
    images: '',
    uploader: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      images: [formData.images]
    };

    try {
      await axios.post('http://localhost:5000/api/clothing/add', payload);
      alert('Item added!');
    } catch (err) {
      alert('Error uploading item.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Clothing Item</h2>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <input name="description" placeholder="Description" onChange={handleChange} required />
      <input name="category" placeholder="Category" onChange={handleChange} required />
      <input name="type" placeholder="Type" onChange={handleChange} required />
      <input name="size" placeholder="Size" onChange={handleChange} required />
      <input name="condition" placeholder="Condition" onChange={handleChange} required />
      <input name="tags" placeholder="Tags (comma separated)" onChange={handleChange} required />
      <input name="images" placeholder="Image URL" onChange={handleChange} required />
      <input name="uploader" placeholder="Uploader Email" onChange={handleChange} required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;