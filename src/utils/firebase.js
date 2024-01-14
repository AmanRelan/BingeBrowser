import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkuMUSiJ9ddkEqLH30EPO6DvZ9gpNMHB0",
  authDomain: "bingebrowser-17909.firebaseapp.com",
  projectId: "bingebrowser-17909",
  storageBucket: "bingebrowser-17909.appspot.com",
  messagingSenderId: "415318289625",
  appId: "1:415318289625:web:431b27f27f28a51ca7a2c8",
  measurementId: "G-Q7NFNBJ4XN"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth();