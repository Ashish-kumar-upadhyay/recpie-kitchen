import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getRandomRecipes } from '../utils/api';

function Home() {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Optional fallback mock data
  const mockRecipes = [
    {
      id: 1,
      title: "Creamy Pasta Carbonara",
      image: "https://spoonacular.com/recipeImages/654959-556x370.jpg",
      readyInMinutes: 30,
    },
    {
      id: 2,
      title: "Margherita Pizza",
      image: "https://spoonacular.com/recipeImages/637125-556x370.jpg",
      readyInMinutes: 25,
    },
    {
      id: 3,
      title: "Fresh Greek Salad",
      image: "https://spoonacular.com/recipeImages/642585-556x370.jpg",
      readyInMinutes: 15,
    },
    {
      id: 4,
      title: "Creamy Tomato Soup",
      image: "https://spoonacular.com/recipeImages/715447-556x370.jpg",
      readyInMinutes: 20,
    },
    {
      id: 5,
      title: "Gourmet Beef Burger",
      image: "https://spoonacular.com/recipeImages/642585-556x370.jpg",
      readyInMinutes: 35,
    },
    {
      id: 6,
      title: "Thai Rice Bowl",
      image: "https://spoonacular.com/recipeImages/649503-556x370.jpg",
      readyInMinutes: 40,
    },
  ];

  // Food categories with icons
  const categories = [
    { name: "Breakfast", icon: "🍳", color: "#FFD700" },
    { name: "Lunch", icon: "🥪", color: "#FF7F50" },
    { name: "Dinner", icon: "🍽️", color: "#9370DB" },
    { name: "Desserts", icon: "🧁", color: "#FF6B81" },
    { name: "Vegetarian", icon: "🥗", color: "#32CD32" },
    // { name: "Quick Meals", icon: "⏱️", color: "#4169E1" },
  ];

  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      try {
        const data = await getRandomRecipes(6);
        setFeaturedRecipes(data.recipes);
      } catch (error) {
        console.error('Error fetching featured recipes:', error.message);
        // Optional: Use mock data if API fails
        setFeaturedRecipes(mockRecipes);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedRecipes();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Discover <span className="highlight">Delicious</span> Recipes
          </h1>
          <p className="hero-subtitle">
            Find and save your favorite recipes from around the world
          </p>
          <div className="hero-actions">
            <Link to="/search" className="hero-btn primary-btn">
              <span className="btn-text">Start Exploring</span>
              <span className="btn-icon">🔍</span>
            </Link>
            <Link to="/saved" className="hero-btn secondary-btn">
              <span className="btn-text">Saved Recipes</span>
              <span className="btn-icon">❤️</span>
            </Link>
          </div>
          
          <div className="floating-images">
            <img 
              src="https://spoonacular.com/recipeImages/637125-556x370.jpg" 
              alt="Food" 
              className="float-img float-1" 
            />
            <img 
              src="https://spoonacular.com/recipeImages/715447-556x370.jpg" 
              alt="Food" 
              className="float-img float-2" 
            />
            <img 
              src="https://spoonacular.com/recipeImages/642585-556x370.jpg" 
              alt="Food" 
              className="float-img float-3" 
            />
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="categories-section">
        <div className="section-title">
          <h2>Browse Categories</h2>
          <div className="title-underline"></div>
        </div>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <Link 
              to={`/search?category=${category.name.toLowerCase()}`} 
              key={index}
              className="category-card"
              style={{ backgroundColor: `${category.color}15` }}
            >
              <div 
                className="category-icon" 
                style={{ backgroundColor: `${category.color}30` }}
              >
                <span>{category.icon}</span>
              </div>
              <h3 className="category-name">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Recipes */}
      <div className="trending-section">
        <div className="section-title">
          <h2>Trending Recipes</h2>
          <div className="title-underline"></div>
        </div>
        {loading ? (
          <div className="loader-container">
            <div className="loader">
              <div className="loader-inner"></div>
            </div>
            <p>Finding delicious recipes...</p>
          </div>
        ) : (
          <div className="trending-grid">
            {featuredRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                to={`/recipe/${recipe.id}`}
                className="trending-card"
              >
                <div className="trending-img-container">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="trending-img"
                  />
                  <div className="trending-time">
                    <span className="time-icon">⏱️</span>
                    <span>{recipe.readyInMinutes} min</span>
                  </div>
                </div>
                <div className="trending-content">
                  <h3 className="trending-title">{recipe.title}</h3>
                  <div className="trending-meta">
                    <span className="trending-meta-item">
                      <span className="meta-icon">👨‍🍳</span>
                      <span>Easy</span>
                    </span>
                    <span className="trending-meta-item">
                      <span className="meta-icon">🔥</span>
                      <span>{Math.floor(Math.random() * 500) + 100} cal</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="view-more">
          <Link to="/search" className="view-more-btn">
            View More Recipes
            <span className="arrow-icon">→</span>
          </Link>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to cook something amazing?</h2>
          <p className="cta-text">Join thousands of food lovers and discover new recipes today!</p>
          <Link to="/search" className="cta-btn">
            Get Cooking Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
