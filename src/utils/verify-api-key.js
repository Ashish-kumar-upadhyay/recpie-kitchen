// Script to verify the API key is valid
const verifyApiKey = async () => {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
  console.log('Verifying API key:', apiKey);
  
  try {
    // Make a simple API call to verify the key
    const response = await fetch(
      `https://api.spoonacular.com/recipes/1/information?apiKey=${apiKey}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API key verification failed:', errorData);
      return false;
    }
    
    const data = await response.json();
    console.log('API key verification successful:', data);
    return true;
  } catch (error) {
    console.error('API key verification error:', error);
    return false;
  }
};

export default verifyApiKey; 