import admin from "firebase-admin";

let app;

export function getFirebaseAdmin() {
  if (!app) {
    if (!admin.apps.length) {
      app = admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      });
    } else {
      app = admin.app();
    }
  }
  return app;
}

export const authAdmin = () => getFirebaseAdmin().auth();
export const dbAdmin = () => getFirebaseAdmin().firestore();