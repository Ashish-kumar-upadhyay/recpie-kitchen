import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getRecipeById } from '../utils/api';
import '../styles/main.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [savingStatus, setSavingStatus] = useState('idle');

  useEffect(() => {
    let isMounted = true;

    const fetchRecipe = async () => {
      try {
        setError(null);
        const data = await getRecipeById(id);
        if (isMounted) {
          setRecipe(data);
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
        if (isMounted) {
          setError(error.message || 'Failed to load recipe details.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRecipe();

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    let isMounted = true;

    const checkIfSaved = async () => {
      if (!user || !recipe) return;

      try {
        const docRef = doc(db, 'users', user.uid, 'savedRecipes', recipe.id.toString());
        const docSnap = await getDoc(docRef);
        if (isMounted) {
          setIsSaved(docSnap.exists());
        }
      } catch (error) {
        console.error('Error checking saved status:', error);
      }
    };

    checkIfSaved();

    return () => {
      isMounted = false;
    };
  }, [user, recipe]);

  const handleSave = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setSavingStatus('pending');
    const docRef = doc(db, 'users', user.uid, 'savedRecipes', recipe.id.toString());
    
    try {
      if (isSaved) {
        await deleteDoc(docRef);
        setIsSaved(false);
      } else {
        await setDoc(docRef, {
          id: recipe.id,
          recipeId: recipe.id.toString(),
          title: recipe.title,
          image: recipe.image,
          readyInMinutes: recipe.readyInMinutes,
          servings: recipe.servings,
          savedAt: new Date().toISOString(),
        });
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error saving/removing recipe:', error);
      alert(isSaved ? 'Failed to remove recipe' : 'Failed to save recipe');
    } finally {
      setSavingStatus('idle');
    }
  };

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

  if (!recipe) {
    return (
      <div className="error-message">
        <span className="emoji">🔍</span>
        <p>Recipe not found</p>
        <button 
          onClick={() => navigate('/')} 
          className="btn btn-primary"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="recipe-detail">
      <div className="recipe-header">
        <div className="recipe-image">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder-recipe.jpg';
            }}
          />
          <div className="recipe-overlay"></div>
        </div>
        <div className="recipe-actions">
          <button
            onClick={handleSave}
            disabled={savingStatus === 'pending'}
            className={`btn ${isSaved ? 'btn-saved' : 'btn-primary'} ${
              savingStatus === 'pending' ? 'btn-loading' : ''
            }`}
          >
            <span className="emoji">{isSaved ? '❤️' : '🤍'}</span>
            {savingStatus === 'pending'
              ? 'Saving...'
              : isSaved
              ? 'Saved'
              : 'Save Recipe'}
          </button>
        </div>
      </div>

      <div className="recipe-content">
        <h1 className="recipe-title">{recipe.title}</h1>
        
        <div className="recipe-meta">
          <div className="meta-item">
            <span className="emoji">⏱️</span>
            <span>{recipe.readyInMinutes} minutes</span>
          </div>
          <div className="meta-item">
            <span className="emoji">👥</span>
            <span>{recipe.servings} servings</span>
          </div>
          <div className="meta-item">
            <span className="emoji">💰</span>
            <span>${(recipe.pricePerServing / 100).toFixed(2)} per serving</span>
          </div>
        </div>

        <div className="recipe-section">
          <h2 className="section-title">Summary</h2>
          <div className="summary" dangerouslySetInnerHTML={{ __html: recipe.summary }} />
        </div>

        <div className="recipe-section">
          <h2 className="section-title">Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.extendedIngredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                <span className="emoji">•</span>
                {ingredient.original}
              </li>
            ))}
          </ul>
        </div>

        <div className="recipe-section">
          <h2 className="section-title">Instructions</h2>
          {recipe.analyzedInstructions && recipe.analyzedInstructions[0]?.steps ? (
            <ol className="instructions-list">
              {recipe.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number} className="instruction-item">
                  <span className="step-number">{step.number}</span>
                  <p>{step.step}</p>
                </li>
              ))}
            </ol>
          ) : (
            <p>No instructions available for this recipe.</p>
          )}
        </div>

        {recipe.nutrition && (
          <div className="recipe-section">
            <h2 className="section-title">Nutrition</h2>
            <div className="nutrition-grid">
              {recipe.nutrition.nutrients.map((nutrient, index) => (
                <div key={index} className="nutrition-item">
                  <span className="nutrient-name">{nutrient.name}</span>
                  <span className="nutrient-value">
                    {nutrient.amount} {nutrient.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail; 