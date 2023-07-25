import { initializeApp, getApps, getApp, cert} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const app = !getApps().length ?  initializeApp({
    credential: cert({
        projectId: process.env.FIREBASE_SERVER_PROJECT_ID,
        privateKey: process.env.FIREBASE_SERVER_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_SERVER_CLIENT_EMAIL,
    })
}) : getApp();
const db = getFirestore(app);

export { db };