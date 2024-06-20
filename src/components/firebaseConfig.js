import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// firebase 설정값
const firebaseConfig = {
    apiKey: "AIzaSyBGAzQiUPzTMbbgCmg0OWaqxD3r-bC26nA",
    authDomain: "ddokdok-33eef.firebaseapp.com",
    projectId: "ddokdok-33eef",
    storageBucket: "ddokdok-33eef.appspot.com",
    messagingSenderId: "15289053114",
    appId: "1:15289053114:web:93087956a86eb6ad6d7783",
    measurementId: "G-2N7RKZHZR4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };