import firebase from 'firebase';
import '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAn92Ew0Z5VJ_TgThlS_krQHUUBW8zzuOE',
    authDomain: 'expresso-418d1.firebaseapp.com',
    databaseURL: 'https://expresso-418d1-default-rtdb.firebaseio.com',
    projectId: 'expresso-418d1',
    storageBucket: 'expresso-418d1.appspot.com',
    messagingSenderId: '723640216847',
    appId: '1:723640216847:web:65558223bfa0ac1ac2a27a',
    measurementId: 'G-SR7PKGX02H',
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

// Consts which can be used throughout the application
// Wherever interaction with firebase is required
const firebaseDB = firebase.database();
const firebaseAuth = firebase.auth();

export {firebaseAuth, firebaseDB};

// const dbRef = firebase.database().ref();
// dbRef.child('Users/Owner').child('Owner1').get().then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log('No data available');
//   }
// }).catch((error) => {
//   console.error(error);
// });

// firebase.database().ref('Users/Owner/Owner2').set({
//   firstName: 'Shayla',
//   lastName: 'Craigs',
//   phone: '024756437',
// }).then(() => {
//   console.log('owner inserted');
// });
