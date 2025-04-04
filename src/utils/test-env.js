// Test file to verify environment variables
console.log('Testing environment variables:');
console.log('VITE_SPOONACULAR_API_KEY:', import.meta.env.VITE_SPOONACULAR_API_KEY);
console.log('All environment variables:', import.meta.env);

// Test direct API call
const testApiCall = async () => {
  try {
    const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
    console.log('Making direct API call with key:', apiKey);
    
    const response = await fetch(
      `https://api.spoonacular.com/recipes/1/information?apiKey=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API call successful:', data);
  } catch (error) {
    console.error('API call failed:', error);
  }
};

// Uncomment to test
// testApiCall();

export default testApiCall; 