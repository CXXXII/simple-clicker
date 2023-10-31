import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8XNZ1Sdt0-UJHTfy4VPLcnC1dRBj_oeg",
  authDomain: "simple-clicker-92cb2.firebaseapp.com",
  projectId: "simple-clicker-92cb2",
  storageBucket: "simple-clicker-92cb2.appspot.com",
  messagingSenderId: "792185690419",
  appId: "1:792185690419:web:f877ebdefec93ce0370646",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

db.enablePersistence().catch((error) => {
  console.log(`Firebase persistence error ${error.code}`);
});

const dataCollection = db.collection("data");

export { dataCollection, db };
