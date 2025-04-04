// Script to directly read the API key from the .env file
import fs from 'fs';
import path from 'path';

const checkEnvFile = () => {
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    console.log('Checking .env file at:', envPath);
    
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      console.log('.env file content:', envContent);
      
      // Extract API key from .env file
      const apiKeyMatch = envContent.match(/VITE_SPOONACULAR_API_KEY=([^\n]+)/);
      if (apiKeyMatch) {
        const apiKey = apiKeyMatch[1];
        console.log('API key from .env file:', apiKey);
        return apiKey;
      } else {
        console.error('API key not found in .env file');
        return null;
      }
    } else {
      console.error('.env file not found');
      return null;
    }
  } catch (error) {
    console.error('Error reading .env file:', error);
    return null;
  }
};

export default checkEnvFile; 