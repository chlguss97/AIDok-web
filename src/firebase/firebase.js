import { initializeApp } from 'firebase/app';
import { getFirestore,Timestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBGAzQiUPzTMbbgCmg0OWaqxD3r-bC26nA",
    authDomain: "ddokdok-33eef.firebaseapp.com",
    projectId: "ddokdok-33eef",
    storageBucket: "ddokdok-33eef.appspot.com",
    messagingSenderId: "15289053114",
    appId: "1:15289053114:web:93087956a86eb6ad6d7783",
    measurementId: "G-2N7RKZHZR4"
  };
  

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore 인스턴스 가져오기
const db = getFirestore(app);

const storage = getStorage(app);

export { db, storage,Timestamp };
