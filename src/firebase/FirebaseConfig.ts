const requiredEnvironmentVariable = (
  name: string,
  value: string | undefined
): string => {
  if (!value) {
    throw new Error(`Missing required Firebase environment variable: ${name}`);
  }

  return value;
};

export const firebaseConfig = {
  apiKey: requiredEnvironmentVariable(
    "REACT_APP_FIREBASE_API_KEY",
    process.env.REACT_APP_FIREBASE_API_KEY
  ),
  authDomain: requiredEnvironmentVariable(
    "REACT_APP_FIREBASE_AUTH_DOMAIN",
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
  ),
  projectId: requiredEnvironmentVariable(
    "REACT_APP_FIREBASE_PROJECT_ID",
    process.env.REACT_APP_FIREBASE_PROJECT_ID
  ),
  storageBucket: requiredEnvironmentVariable(
    "REACT_APP_FIREBASE_STORAGE_BUCKET",
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
  ),
  messagingSenderId: requiredEnvironmentVariable(
    "REACT_APP_FIREBASE_MESSAGING_SENDER_ID",
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
  ),
  appId: requiredEnvironmentVariable(
    "REACT_APP_FIREBASE_APP_ID",
    process.env.REACT_APP_FIREBASE_APP_ID
  ),
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};
