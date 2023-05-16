
/*
const REACT_APP_FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const REACT_APP_FIREBASE_AUTH_DOMAIN =
  process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const REACT_APP_FIREBASE_PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const REACT_APP_FIREBASE_STORAGE_BUCKET =
  process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
const REACT_APP_FIREBASE_MESSAGING_SENDER_ID =
  process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
const REACT_APP_FIREBASE_APP_ID = process.env.REACT_APP_FIREBASE_APP_ID;
const REACT_APP_FIREBASE_MEASUREMENT_ID =
  process.env.REACT_APP_FIREBASE_MEASUREMENT_ID;

const firebaseConfig: FirebaseOptions = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(firebaseApp);

export class FirebaseConfig {
  private readonly _firebaseApp: FirebaseApp;
  private readonly _googleAuthProvider: GoogleAuthProvider;
  private readonly _facebookAuthProvider: FacebookAuthProvider;
  constructor() {
    this._firebaseApp = initializeApp(firebaseConfig);
    this._facebookAuthProvider = new FacebookAuthProvider();
    this._googleAuthProvider = new GoogleAuthProvider();
  }

  getAuth(): Auth {
    return getAuth(this._firebaseApp);
  }

  get firebaseApp(): FirebaseApp {
    return this._firebaseApp;
  }

  get facebookAuthProvider(): FacebookAuthProvider {
    return this._facebookAuthProvider;
  }

  get googleAuthProvider(): GoogleAuthProvider {
    return this._googleAuthProvider;
  }
}


 */