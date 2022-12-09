
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import {getAuth} from 'firebase/auth'



const firebasConfig = {
    apiKey: "AIzaSyD5YC5rwftMYDD2CQWeXY9kcGQD5RP_dTU",
    authDomain: "zyklo-react-app.firebaseapp.com",
    projectId: "zyklo-react-app",
    storageBucket: "zyklo-react-app.appspot.com",
    messagingSenderId: "683355236539",
    appId: "1:683355236539:web:fe1e997f2d6bc20a1b619e",
    measurementId: "G-WPPQZLP99K"
};

const app = initializeApp(firebasConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);


export { db, auth, storage };