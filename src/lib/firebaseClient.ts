// src/lib/firebaseClient.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, connectAuthEmulator, type Auth } from "firebase/auth";
import {
  getFirestore,
  connectFirestoreEmulator,
  type Firestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

// Only use emulators in dev + when explicitly enabled
const useEmulators =
  process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true" &&
  process.env.NODE_ENV === "development";

if (useEmulators) {
  // Avoid reconnect spam from Fast Refresh
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const authAny = auth as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dbAny = db as any;

  if (!authAny._emulatorStarted) {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", {
      disableWarnings: true,
    });
    authAny._emulatorStarted = true;
  }

  if (!dbAny._emulatorStarted) {
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
    dbAny._emulatorStarted = true;
  }
}

export { auth, db };
