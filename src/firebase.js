import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0NsauoPWl4lsmVSCcYR_QG1zqHkaOD1c",
  authDomain: "flighttracker-63e05.firebaseapp.com",
  projectId: "flighttracker-63e05",
  storageBucket: "flighttracker-63e05.firebasestorage.app",
  messagingSenderId: "922121022548",
  appId: "1:922121022548:web:2274ab5ed5e7c60208d1c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
