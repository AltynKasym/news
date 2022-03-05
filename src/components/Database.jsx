import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCWH-iDDeWhPdcvCiy1BYjsmgmq_go9BiQ",
  authDomain: "news-8c5b0.firebaseapp.com",
  databaseURL: "https://news-8c5b0-default-rtdb.firebaseio.com",
  projectId: "news-8c5b0",
  storageBucket: "news-8c5b0.appspot.com",
  messagingSenderId: "1065177663199",
  appId: "1:1065177663199:web:ba451f461c4cc756fd4b6a",
  measurementId: "G-LFDNR1QJ22",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
