// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTj-dw96r9moRoxGXxWjUsP7mCU0gBEcM",
  authDomain: "toy-topia-f3ea6.firebaseapp.com",
  projectId: "toy-topia-f3ea6",
  storageBucket: "toy-topia-f3ea6.firebasestorage.app",
  messagingSenderId: "187767366733",
  appId: "1:187767366733:web:bfe8fc80c1c774aac8e804"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;