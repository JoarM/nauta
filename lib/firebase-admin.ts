import { initFirestore } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

export const db = initFirestore({
    credential: cert({
        projectId: process.env.FIREBASE_SERVER_PROJECT_ID,
        privateKey: JSON.parse(process.env.FIREBASE_SERVER_PRIVATE_KEY as string),
        clientEmail: process.env.FIREBASE_SERVER_CLIENT_EMAIL,
    }),
});