// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUJ0NICbFiMGkJgdxq2KPagSMRFrcR4wo",
  authDomain: "jaytube-8c43d.firebaseapp.com",
  projectId: "jaytube-8c43d",
  storageBucket: "jaytube-8c43d.appspot.com",
  messagingSenderId: "827907890425",
  appId: "1:827907890425:web:1072f0a5a87f99f67a1628",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
