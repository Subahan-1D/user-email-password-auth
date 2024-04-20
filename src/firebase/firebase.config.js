import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq_79wSc3am8WfJCGMYT1kthYJD5ZOmB4",
  authDomain: "user-email-password-auth-59a61.firebaseapp.com",
  projectId: "user-email-password-auth-59a61",
  storageBucket: "user-email-password-auth-59a61.appspot.com",
  messagingSenderId: "16117528032",
  appId: "1:16117528032:web:47979ee94e6cd06c616785"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;