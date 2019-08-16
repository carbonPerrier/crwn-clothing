import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// firebase authentication ( Google )
const config = {
    apiKey: "AIzaSyB0naYsBnzW5rkattehauNx_XK-IHIM0y0",
    authDomain: "learnoauth2019.firebaseapp.com",
    databaseURL: "https://learnoauth2019.firebaseio.com",
    projectId: "learnoauth2019",
    storageBucket: "",
    messagingSenderId: "73366511529",
    appId: "1:73366511529:web:8842d3f0286e768e"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;

// firebase db
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
        return null; // unanthenticated user
    }

    const userRef = firestore.doc(`users/${userAuth.uid}`); 

    const snapShot = await userRef.get() // fetch user data

    if (!snapShot.exists) { // new anthenticated user
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch(error) {
            console.log("ERROR: createUserProfileDocument()", error.message);
        }
    }

    return userRef;
}
