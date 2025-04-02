import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAYY81oTtcWgKHki2U3bHfMkf1wxXZoz5Y",
  authDomain: "blogging-cd0c3.firebaseapp.com",
  databaseURL: "https://blogging-cd0c3-default-rtdb.firebaseio.com",
  projectId: "blogging-cd0c3",
  storageBucket: "blogging-cd0c3.firebasestorage.app",
  messagingSenderId: "301629383839",
  appId: "1:301629383839:web:906c01a1c58dd736ffeeaa",
  measurementId: "G-LXCFC83QG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics }; 