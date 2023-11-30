
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgLPv_OU6z7VOPktLAxtM3r_AEhWvy-Sg",
  authDomain: "borandiscoversfire.firebaseapp.com",
  projectId: "borandiscoversfire",
  storageBucket: "borandiscoversfire.appspot.com",
  messagingSenderId: "117847605957",
  appId: "1:117847605957:web:de079d6bef20b489a366ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);