import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoN4zwkPEjtdV8B9kd2SDneRp7PuonYho",
  authDomain: "fir-course-ad012.firebaseapp.com",
  projectId: "fir-course-ad012",
  storageBucket: "fir-course-ad012.firebasestorage.app",
  messagingSenderId: "611187570457",
  appId: "1:611187570457:web:078c7dedbdd2cc0fc07788",
  measurementId: "G-1XS6J9C2RJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);