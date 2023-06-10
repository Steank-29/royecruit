import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBp3EJlQGCu1nfsPDAAClSRRh1_FRUzB7E",
  authDomain: "royecruit.firebaseapp.com",
  projectId: "royecruit",
  storageBucket: "royecruit.appspot.com",
  messagingSenderId: "327707385079",
  appId: "1:327707385079:web:4d12b301ad1331c1dec7f2",
  measurementId: "G-D1JJCX40DX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);