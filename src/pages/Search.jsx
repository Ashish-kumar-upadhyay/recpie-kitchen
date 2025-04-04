import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { searchRecipes } from '../utils/api';
import '../styles/main.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    cuisine: '',
    diet: '',
    mealType: '',
    maxReadyTime: ''
  });
  const [activeFilters, setActiveFilters] = useState(0);
  const [animateIn, setAnimateIn] = useState(false);

  // Handle category from URL
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      // Map category to appropriate filter
      if (category === 'breakfast' || category === 'lunch' || category === 'dinner') {
        setFilters(prev => ({ ...prev, mealType: category }));
      } else if (category === 'vegetarian') {
        setFilters(prev => ({ ...prev, diet: 'vegetarian' }));
      } else if (category === 'desserts') {
        setFilters(prev => ({ ...prev, mealType: 'dessert' }));
      }
      // Automatically search when category is present
      handleSearch(null, category);
    }
  }, [searchParams]);

  useEffect(() => {
    // Count active filters
    let count = 0;
    Object.values(filters).forEach(value => {
      if (value) count++;
    });
    setActiveFilters(count);
    
    // Trigger animation on mount
    setTimeout(() => {
      setAnimateIn(true);
    }, 100);
  }, [filters]);

  const handleSearch = async (e, categoryQuery = '') => {
    if (e) e.preventDefault();
    if (!categoryQuery && !query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      // Build filter parameters object
      const searchParams = {
        query: categoryQuery || query.trim(),
        number: 12 // Number of results to return
      };

      // Add filters if they are set
      if (filters.cuisine) searchParams.cuisine = filters.cuisine;
      if (filters.diet) searchParams.diet = filters.diet;
      if (filters.mealType) searchParams.type = filters.mealType;
      if (filters.maxReadyTime) searchParams.maxReadyTime = parseInt(filters.maxReadyTime);

      const data = await searchRecipes(searchParams);
      
      if (data.results && data.results.length > 0) {
        setRecipes(data.results);
      } else {
        setError('No recipes found. Try different search terms or filters.');
        setRecipes([]);
      }
    } catch (error) {
      console.error('Error searching recipes:', error);
      setError(error.message || 'Failed to search recipes. Please try again.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      cuisine: '',
      diet: '',
      mealType: '',
      maxReadyTime: ''
    });
  };

  return (
    <div className="enhanced-search-page">
      <div className="search-header">
        <div className="search-header-content">
          <h1 className={`search-title ${animateIn ? 'animated' : ''}`}>
            Discover <span className="highlight">Delicious</span> Recipes
            <div className="title-emoji">
              <span className="emoji">🍽️</span>
            </div>
          </h1>
          <p className={`search-subtitle ${animateIn ? 'animated' : ''}`}>
            Search from thousands of tasty recipes for any meal, diet, or occasion
          </p>
        </div>
      </div>

      <div className={`search-container ${animateIn ? 'animated' : ''}`}>
        <form onSubmit={handleSearch} className="enhanced-search-form">
          <div className="search-bar-container">
            <div className="search-bar-wrapper">
              <div className="search-icon">
                <span>🔍</span>
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What would you like to cook today?"
                className="enhanced-search-input"
                autoFocus
              />
              {query && (
                <button 
                  type="button" 
                  className="clear-input"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="enhanced-search-button"
            >
              {loading ? (
                <div className="button-content">
                  <div className="button-spinner"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                <div className="button-content">
                  <span>Find Recipes</span>
                </div>
              )}
            </button>
          </div>
          
          <div className="filters-section">
            <div className="filters-header">
              <h3 className="filters-title">
                <span className="filters-icon">🔍</span>
                <span>Refine your search</span>
                {activeFilters > 0 && (
                  <span className="active-filters-badge">{activeFilters}</span>
                )}
              </h3>
              {activeFilters > 0 && (
                <button 
                  type="button" 
                  className="clear-filters"
                  onClick={clearFilters}
                >
                  Clear all filters
                </button>
              )}
            </div>
            
            <div className="enhanced-filter-grid">
              <div className="filter-group">
                <label className="filter-label">Cuisine Type</label>
                <select
                  name="cuisine"
                  value={filters.cuisine}
                  onChange={handleFilterChange}
                  className="enhanced-filter-select"
                >
                  <option value="">All Cuisines</option>
                  <option value="italian">🇮🇹 Italian</option>
                  <option value="mexican">🇲🇽 Mexican</option>
                  <option value="chinese">🇨🇳 Chinese</option>
                  <option value="indian">🇮🇳 Indian</option>
                  <option value="american">🇺🇸 American</option>
                  <option value="thai">🇹🇭 Thai</option>
                  <option value="japanese">🇯🇵 Japanese</option>
                  <option value="french">🇫🇷 French</option>
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Dietary Preference</label>
                <select
                  name="diet"
                  value={filters.diet}
                  onChange={handleFilterChange}
                  className="enhanced-filter-select"
                >
                  <option value="">Any Diet</option>
                  <option value="vegetarian">🥬 Vegetarian</option>
                  <option value="vegan">🌱 Vegan</option>
                  <option value="glutenFree">🌾 Gluten Free</option>
                  <option value="ketogenic">🥑 Ketogenic</option>
                  <option value="paleo">🍖 Paleo</option>
                  <option value="dairyFree">🥛 Dairy Free</option>
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Meal Type</label>
                <select
                  name="mealType"
                  value={filters.mealType}
                  onChange={handleFilterChange}
                  className="enhanced-filter-select"
                >
                  <option value="">Any Type</option>
                  <option value="main course">🍖 Main Course</option>
                  <option value="side dish">🥔 Side Dish</option>
                  <option value="dessert">🍰 Dessert</option>
                  <option value="appetizer">🥗 Appetizer</option>
                  <option value="salad">🥬 Salad</option>
                  <option value="breakfast">🍳 Breakfast</option>
                  <option value="soup">🍲 Soup</option>
                  <option value="beverage">🥤 Beverage</option>
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Preparation Time</label>
                <select
                  name="maxReadyTime"
                  value={filters.maxReadyTime}
                  onChange={handleFilterChange}
                  className="enhanced-filter-select"
                >
                  <option value="">Any Time</option>
                  <option value="15">⏱️ Under 15 minutes</option>
                  <option value="30">⏱️ Under 30 minutes</option>
                  <option value="45">⏱️ Under 45 minutes</option>
                  <option value="60">⏱️ Under 1 hour</option>
                </select>
              </div>
            </div>
          </div>
        </form>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {loading ? (
          <div className="loader-container">
            <div className="loader">
              <div className="loader-inner"></div>
            </div>
            <p>Finding delicious recipes...</p>
          </div>
        ) : (
          <>
            {recipes.length > 0 && (
              <div className="results-header">
                <h2 className="results-title">Found {recipes.length} delicious recipes</h2>
                <p className="results-subtitle">Click on any recipe to see the details</p>
              </div>
            )}
            
            <div className="enhanced-recipe-grid">
              {recipes.map((recipe) => (
                <Link
                  key={recipe.id}
                  to={`/recipe/${recipe.id}`}
                  className="enhanced-recipe-card"
                >
                  <div className="recipe-image-container">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title} 
                      className="recipe-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-recipe.jpg';
                      }}
                    />
                    <div className="recipe-overlay"></div>
                    {recipe.vegetarian && <div className="recipe-badge vegetarian">🥬 Vegetarian</div>}
                    {recipe.vegan && <div className="recipe-badge vegan">🌱 Vegan</div>}
                    {recipe.glutenFree && <div className="recipe-badge gluten-free">🌾 Gluten Free</div>}
                  </div>
                  <div className="enhanced-recipe-content">
                    <h3 className="enhanced-recipe-title">{recipe.title}</h3>
                    <div className="enhanced-recipe-meta">
                      <div className="meta-item">
                        <span className="meta-icon">⏱️</span>
                        <span>{recipe.readyInMinutes || "30"} min</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-icon">👥</span>
                        <span>{recipe.servings || "4"} servings</span>
                      </div>
                      {recipe.healthScore && (
                        <div className="meta-item">
                          <span className="meta-icon">❤️</span>
                          <span>{recipe.healthScore}% healthy</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="view-recipe">View Recipe →</div>
                </Link>
              ))}
            </div>
            
            {recipes.length === 0 && !error && !loading && (
              <div className="empty-search-state">
                <div className="empty-icon">🔍</div>
                <h3>Ready to find some recipes?</h3>
                <p>Enter ingredients or dish names in the search box above and click "Find Recipes"</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search; 