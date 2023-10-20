import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCl9Ug6rW81T-QGYNsj0F5Qi6KOYneljxo",
  authDomain: "reactcoder-812ad.firebaseapp.com",
  projectId: "reactcoder-812ad",
  storageBucket: "reactcoder-812ad.appspot.com",
  messagingSenderId: "89633869954",
  appId: "1:89633869954:web:be1ccd475d2ca72c70a49b",
  measurementId: "G-PSL9J3KC1Y"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
