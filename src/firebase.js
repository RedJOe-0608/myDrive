import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getDocs, getFirestore, collection} from "firebase/firestore";
import { getStorage} from "firebase/storage";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'mock-key',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export const database = {
//   folders: getDocs(collection(firestore,"folders")),
//   files: getDocs(collection(firestore,"files"))
// }


export const auth = getAuth(app)
