
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDm-FqqeMiwfj9GZsldnlOXtNOtU7ZCmNI",
  authDomain: "potarok-checker.firebaseapp.com",
  projectId: "potarok-checker",
  storageBucket: "potarok-checker.appspot.com",
  messagingSenderId: "108769732640",
  appId: "1:108769732640:web:54a7452a63de3095f53445"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
