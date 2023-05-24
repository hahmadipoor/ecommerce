import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTe6yTzcSkuJHe9zeg7mGmDAR_KcU_pz8",
    authDomain: "ecommerce-7c36e.firebaseapp.com",
    projectId: "ecommerce-7c36e",
    storageBucket: "ecommerce-7c36e.appspot.com",
    messagingSenderId: "707677475467",
    appId: "1:707677475467:web:b2927356878ecfea47ba8e"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
