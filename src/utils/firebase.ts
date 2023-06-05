import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyCi3HCo5FDJ_awkqsaLEFqfCVJUSO9SOx8",
  authDomain: "hello-office-boy.firebaseapp.com",
  databaseURL: "https://hello-office-boy.firebaseio.com",
  projectId: "hello-office-boy",
  storageBucket: "hello-office-boy.appspot.com",
  messagingSenderId: "1026746853292",
  appId: "1:1026746853292:web:c23cec4062b0cbed213c09",
  measurementId: "G-J191QSTWRG"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
const auth = firebase.auth();

auth
  .signInAnonymously()
  .then(() => console.log('SIGNEDIN'))
  .catch((e) => console.error(e))

export { firebase, firestore };
