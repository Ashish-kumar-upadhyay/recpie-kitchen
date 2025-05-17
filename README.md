
# Project Title
A Recipe Discovery and Management Platform for Food Lovers

## Deployed Project Link
[https://recpie-kitchen.vercel.app/]<!-- Replace with actual deployed link -->



## Table of Contents
- Introduction  
- Features  
- Team Members  
- Technologies Used  
- Setup Instructions  
- File Structure  
- Usage  
- License  

## Introduction
Recipe Kitchen is a modern web application that allows users to discover, search, and save their favorite recipes. Built using React for frontend and Firebase for authentication and storage, this app provides a smooth and interactive experience for users interested in cooking and culinary exploration.

## Features

### 🔐 General Features:
- Firebase Authentication (Login/Register)
- Protected Routes with PrivateRoute component
- Clean, mobile-responsive UI

### 👩‍🍳 User Features:
- Search recipes using keywords
- View detailed recipe instructions and images
- Save favorite recipes for quick access
- Filter and explore various recipe types

## Team Members
This was a solo project built and maintained by:

- **Ashish Kumar Upadhyay**  
  Worked on the full-stack development of the app including authentication, API integration, route protection, and UI layout.

## Technologies Used
- **Frontend:** React.js, JSX, Tailwind CSS
- **Backend/Auth:** Firebase Authentication & Firestore
- **APIs:** Spoonacular API (for recipes)
- **Routing & State:** React Router, Context API
- **Others:** Vite, PrivateRoute, Hooks

## Setup Instructions

### Prerequisites:
- Node.js installed
- Firebase project with Auth and Firestore setup
- Spoonacular API key (for recipe search)

### Steps:
```bash
git clone https://github.com/ashish-kumar-upadhyay/recpie-kitchen-main.git
cd recpie-kitchen-main
npm install
```

- Create a `.env` file and add your Firebase config and Spoonacular API key:
```env
VITE_API_KEY=your_spoonacular_key
VITE_FIREBASE_API_KEY=your_firebase_key
...
```

- Start the development server:
```bash
npm run dev
```

- Visit the app at: http://localhost:5173

## File Structure
```
recpie-kitchen-main/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── FeaturedRecipes.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── PrivateRoute.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── RecipeDetail.jsx
│   │   ├── Register.jsx
│   │   ├── SavedRecipes.jsx
│   │   └── Search.jsx
│   ├── config/
│   ├── contexts/
│   ├── firebase.js
│   ├── hooks/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── .env
```

## Usage

### For Users:
1. Register or log in to your account.
2. Use the search bar to find recipes by name or ingredient.
3. View details of each recipe including instructions, ingredients, and image.
4. Save recipes to your personal list for later access.

## License
This project is licensed under the **MIT License**.
