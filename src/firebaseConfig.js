import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyBDDCn-HhNzc1w6Xa_J1g8gGyS2OmerlJY",
    authDomain: "product-hunt-clone-fa84f.firebaseapp.com",
    projectId: "product-hunt-clone-fa84f",
    storageBucket: "product-hunt-clone-fa84f.appspot.com",
    messagingSenderId: "936253561288",
    appId: "1:936253561288:web:7a8717a4ab718d8a7a08fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const storage = getStorage();
export const db = getFirestore(app);