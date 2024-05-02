// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBwprtCQWwsfeRbnaSx0_t8WZ6qFV1D_IM",
    authDomain: "mariocustom-b8ae1.firebaseapp.com",
    projectId: "mariocustom-b8ae1",
    storageBucket: "mariocustom-b8ae1.appspot.com",
    messagingSenderId: "755865268685",
    appId: "1:755865268685:web:e5b9dd44b37a3e0f7ad484",
    measurementId: "G-8E865LMBBR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);