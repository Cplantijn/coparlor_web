import { initializeApp } from "firebase/app";
import { getAuth, onIdTokenChanged, type User } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

let currentUser: User | null = null;
let authReadyPromise: Promise<void>;

// This promise resolves once the first auth state check is finished.
authReadyPromise = new Promise((resolve) => {
  onIdTokenChanged(auth, (user) => {
    currentUser = user;
    resolve();
    // We only need to wait for the first event to know if we are authenticated or not.
    // Subsequent updates are handled by the listener naturally.
  });
});

/**
 * Returns the current Firebase ID token, or waits for auth to be ready.
 * If forceRefresh is true, a fresh token will be requested.
 */
export async function getIdToken(forceRefresh = false): Promise<string | null> {
  await authReadyPromise;
  if (!currentUser) {
    return null;
  }
  return currentUser.getIdToken(forceRefresh);
}

/**
 * Hook or utility function to check if a user is currently authenticated.
 */
export function isAuthenticated(): boolean {
  return !!auth.currentUser;
}
