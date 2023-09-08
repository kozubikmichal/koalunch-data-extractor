import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, cert, getApps } from "firebase-admin/app";

const getApp = () => {
    if (getApps().length) {
        return getApps()[0];
    } else {
        return initializeApp(
            {
                credential: cert({
                    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(
                        /\\n/gm,
                        "\n"
                    ),
                    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
                }),
            },
            process.env.FIREBASE_ADMIN_PROJECT_ID
        );
    }
};

export const getDb = () => getFirestore(getApp());
