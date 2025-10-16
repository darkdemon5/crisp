import { initializeApp } from "firebase/app";
import { getAuth, setPersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCCx9Tn3HKltQJD_HtsqFettAvibkhIOvI",
  authDomain: "crisp-aa9c5.firebaseapp.com",
  databaseURL:
    "https://crisp-aa9c5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "crisp-aa9c5",
  storageBucket: "crisp-aa9c5.appspot.com",
  messagingSenderId: "319780463503",
  appId: "1:319780463503:web:943986b891df0f7e8ce1fa",
  measurementId: "G-VBDTV2BMDN",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
// setPersistence(auth, )
export { db, auth };
