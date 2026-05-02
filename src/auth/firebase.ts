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

// Resolves only once a user (anonymous or existing) is available.
// The first onIdTokenChanged event may fire with null (no session), so we
// wait for a non-null user — which will arrive once anonymous sign-in completes.
let resolveUserReady!: () => void;
const userReadyPromise = new Promise<void>((resolve) => {
  resolveUserReady = resolve;
});

onIdTokenChanged(auth, (user) => {
  currentUser = user;
  if (user) {
    resolveUserReady();
  }
});

/**
 * Returns the current Firebase ID token, waiting until a user session exists.
 * If forceRefresh is true, a fresh token will be requested.
 */
export async function getIdToken(forceRefresh = false): Promise<string | null> {
  await userReadyPromise;
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
