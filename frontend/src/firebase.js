// frontend/src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase構成
const firebaseConfig = {
  apiKey: "AIzaSyCTRdHeSIzBixPHOg7Lhw6AZMdZBZSzbGA",
  authDomain: "lifelog-app-6b84f.firebaseapp.com",
  projectId: "lifelog-app-6b84f",
  storageBucket: "lifelog-app-6b84f.appspot.com",
  messagingSenderId: "827795557222",
  appId: "1:827795557222:web:default", // 任意。未確定なら仮の値を記載
};

// Firebase初期化
const app = initializeApp(firebaseConfig);

// Firestoreインスタンスをエクスポート
export const db = getFirestore(app);
