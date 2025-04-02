import { Link } from 'react-router-dom';
import '../styles/main.css';

const FeaturedRecipes = ({ recipes }) => {
  return (
    <section className="featured-section">
      <div className="featured-header">
        <h2 className="featured-title">
          <span>✨ Featured Recipes</span>
        </h2>
        <p className="featured-description">
          Discover our handpicked selection of delicious recipes that will inspire your next culinary adventure
        </p>
      </div>

      <div className="featured-grid">
        {recipes.map((recipe) => (
          <Link 
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            className="featured-card"
          >
            <div className="featured-image">
              <img src={recipe.image} alt={recipe.title} />
              <div className="featured-overlay"></div>
            </div>
            <div className="featured-content">
              <h3 className="featured-recipe-title">{recipe.title}</h3>
              <div className="featured-meta">
                <div className="featured-meta-item">
                  <span className="emoji">⏱️</span>
                  <span>{recipe.readyInMinutes} min</span>
                </div>
                <div className="featured-meta-item">
                  <span className="emoji">👥</span>
                  <span>{recipe.servings} servings</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRecipes; 