import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBXGSF5NewL1x0aW9BgOVWsbLFh6ryvj2Y",
    authDomain: "register-app-24c7b.firebaseapp.com",
    projectId: "register-app-24c7b",
    storageBucket: "register-app-24c7b.firebasestorage.app",
    messagingSenderId: "721630634088",
    appId: "1:721630634088:web:673e605c452874b5ab1bdd",
    databaseURL: "https://register-app-24c7b-default-rtdb.firebaseio.com",
    
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;