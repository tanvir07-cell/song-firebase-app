import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
import { config } from "./config"

export function firebaseInit(){
    const app = initializeApp(config.firebase);
    const firestore = getFirestore(app);
    const auth = getAuth(app);

    return {app, firestore, auth}
}
