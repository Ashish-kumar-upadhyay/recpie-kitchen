import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, getDocs, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/main.css';

const SavedRecipes = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSavedRecipes = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setError(null);
        // Query saved recipes for the current user, ordered by timestamp
        const q = query(
          collection(db, 'users', user.uid, 'savedRecipes'),
          orderBy('savedAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        
        if (!isMounted) return;

        const savedRecipes = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setRecipes(savedRecipes);
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
        if (isMounted) {
          setError('Failed to load saved recipes. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSavedRecipes();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleRemove = async (recipeId) => {
    if (!user) return;

    try {
      // Remove from Firestore
      await deleteDoc(doc(db, 'users', user.uid, 'savedRecipes', recipeId.toString()));
      
      // Update local state
      setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== recipeId));
    } catch (error) {
      console.error('Error removing recipe:', error);
      alert('Failed to remove recipe. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="auth-message">
        <span className="emoji">🔒</span>
        <h2>Please log in to view your saved recipes</h2>
        <p>Sign in to access your favorite recipes collection</p>
        <Link to="/login" className="btn btn-primary">
          <span className="emoji">🔑</span>
          Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <span className="emoji">❌</span>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state-icon">📚</span>
        <h2 className="empty-state-title">No Saved Recipes Yet</h2>
        <p className="empty-state-text">
          Start exploring and save your favorite recipes to access them quickly!
        </p>
        <Link to="/search" className="btn btn-primary">
          <span className="emoji">🔍</span>
          Find Recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="saved-recipes-container">
      <h1 className="saved-recipes-title">Your Saved Recipes ❤️</h1>
      <div className="saved-recipes-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="saved-recipe-card">
            <Link 
              to={`/recipe/${recipe.recipeId || recipe.id}`}
              className="saved-recipe-link"
            >
              <div className="saved-recipe-image">
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-recipe.jpg';
                  }}
                />
                <div className="saved-recipe-overlay"></div>
              </div>
              <div className="saved-recipe-content">
                <h3 className="saved-recipe-title">{recipe.title}</h3>
                <div className="saved-recipe-meta">
                  {recipe.readyInMinutes && (
                    <span>
                      <span className="emoji">⏱️</span>
                      {recipe.readyInMinutes} min
                    </span>
                  )}
                  {recipe.servings && (
                    <span>
                      <span className="emoji">👥</span>
                      {recipe.servings} servings
                    </span>
                  )}
                </div>
              </div>
            </Link>
            <button 
              onClick={(e) => {
                e.preventDefault();
                handleRemove(recipe.id);
              }}
              className="remove-button"
              title="Remove from saved recipes"
            >
              <span className="emoji">🗑️</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedRecipes; 