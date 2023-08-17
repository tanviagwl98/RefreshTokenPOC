// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCu7mIvNfMs9iTM0vKxYF3Yyb0XAQXxlr0",
  authDomain: "refreshtoken-a2387.firebaseapp.com",
  projectId: "refreshtoken-a2387",
  storageBucket: "refreshtoken-a2387.appspot.com",
  messagingSenderId: "324924585806",
  appId: "1:324924585806:web:9fe04fab8958afeca3901f",
  measurementId: "G-KWFKDFF30B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
