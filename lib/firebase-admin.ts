import { initFirestore } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

export const db = initFirestore({
    credential: cert({
        projectId: process.env.FIREBASE_SERVER_PROJECT_ID,
        privateKey: process.env.FIREBASE_SERVER_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_SERVER_CLIENT_EMAIL,
    }),
});