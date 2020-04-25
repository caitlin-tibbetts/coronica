import firebase from '@firebase/app';
import '@firebase/firestore';

import {
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    MESSAGE_SENDER_ID,
    APP_ID,
    MEASUREMENT_ID
} from 'react-native-dotenv'

const firebaseConfig = {
   apiKey: API_KEY,
   authDomain: AUTH_DOMAIN,
   databaseURL: DATABASE_URL,
   projectId: PROJECT_ID,
   storageBucket: "coronica.appspot.com",
   messagingSenderId: MESSAGE_SENDER_ID,
   appId: APP_ID,
   measurementId: MEASUREMENT_ID
}

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
