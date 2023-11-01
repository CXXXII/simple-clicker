import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8XNZ1Sdt0-UJHTfy4VPLcnC1dRBj_oeg",
  authDomain: "simple-clicker-92cb2.firebaseapp.com",
  projectId: "simple-clicker-92cb2",
  storageBucket: "simple-clicker-92cb2.appspot.com",
  messagingSenderId: "792185690419",
  appId: "1:792185690419:web:f877ebdefec93ce0370646",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
