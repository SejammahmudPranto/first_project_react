import { initializeApp } from "firebase/app";

// Initialize Firebase
const app = initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
});
export default app;

// REACT_APP_API_KEY= AIzaSyCpkE-eF9Lrji2_ycBoZGyXgQ7IULpQctE
// REACT_APP_AUTH_DOMAIN=react-quiz-app-dev-aae7f.firebaseapp.com
// REACT_APP_PROJECT_ID=react-quiz-app-dev-aae7f
// REACT_APP_STORAGE_BUCKET=react-quiz-app-dev-aae7f.appspot.com
// REACT_APP_MESSAGING_SENDER_ID=670580293221
// REACT_APP_APP_ID=1:670580293221:web:ade19045f5da65ad0ad08c
