import { initFirestore } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

const privateKey = JSON.parse(process.env.FIREBASE_SERVER_PRIVATE_KEY as string);

export const db = initFirestore({
    credential: cert({
        projectId: process.env.FIREBASE_SERVER_PROJECT_ID,
        privateKey: privateKey,
        clientEmail: process.env.FIREBASE_SERVER_CLIENT_EMAIL,
    }),
});