import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// import firebase from "firebase/compat/app";
// import "firebase/compat/firestore";
// import "firebase/compat/auth";

import { useState, useEffect, useContext, createContext } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAG7oAdZuK2zZS_2I3SOp-eO-MxoxDVrd8",
  authDomain: "meetup-production-f1470.firebaseapp.com",
  projectId: "meetup-production-f1470",
  storageBucket: "meetup-production-f1470.appspot.com",
  messagingSenderId: "754437329293",
  appId: "1:754437329293:web:495d302912bb9e886c2dc4",
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
// export const app = firebase.initializeApp(firebaseConfig);
// export const firestore = firebase.firestore();
// const auth = app.auth();
const auth = getAuth();
export const AuthContext = createContext();

export const useAuthState = () => {
  return useContext(AuthContext);
};
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setCurrentUser(user);
        setLoading(false);
        // ...
      } else {
        console.log("user logged out");
        setCurrentUser({});
        // User is signed out
        // ...
      }
      unsubscribe();
    });
    // const unsubscribe = auth.onAuthStateChanged((user) => {
    //   setCurrentUser(user);
    //   setLoading(false);
    // });
    // console.log(unsubscribe());
    // return () => unsubscribe();
  }, []);
  const value = {
    currentUser,
  };

  // useEffect(() => {
  //   setCurrentUser(auth.currentUser);
  //   setLoading(false);
  // }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
export default firestore;
