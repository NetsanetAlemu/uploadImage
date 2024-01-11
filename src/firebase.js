import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD76tw1MYdadwFeO2cLtkCiH34Bqe6heaI",
  authDomain: "uploadfile-2f2ae.firebaseapp.com",
  projectId: "uploadfile-2f2ae",
  storageBucket: "uploadfile-2f2ae.appspot.com",
  messagingSenderId: "134385431551",
  appId: "1:134385431551:web:379bcb9abed8d365d66dca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
