import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const featuredItems = [
  { id: 1, title: 'Vintage Jacket', image: '/images/jacket.jpg' },
  { id: 2, title: 'Retro Dress', image: '/images/dress.jpg' },
  { id: 3, title: 'Classic Jeans', image: '/images/jeans.jpg' },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
        <h1>♻️ Welcome to ReWear</h1>
        <p>Sustainable fashion through swapping, not shopping.</p>

        <div className="cta-buttons">
            <button onClick={() => navigate('/dashboard')}>Start Swapping</button>
            <button onClick={() => navigate('/browse')}>Browse Items</button>
            <button onClick={() => navigate('/add-item')}>Add new items</button>
        </div>

        <div className="featured-section">
            <h3>🌟 Featured Items</h3>
            <div className="carousel">
                {featuredItems.map(item => (
                    <div key={item.id} className="carousel-item">
                        <img src={item.image} alt={item.title} />
                        <p>{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default LandingPage;