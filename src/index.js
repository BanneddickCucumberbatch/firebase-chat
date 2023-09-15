import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";

  const app = initializeApp({
  apiKey: "AIzaSyClc-nizjyIX8ywnoerkQ2TJivwfG2N3s4",
  authDomain: "chat-test-sandbox.firebaseapp.com",
  projectId: "chat-test-sandbox",
  storageBucket: "chat-test-sandbox.appspot.com",
  messagingSenderId: "166740736870",
  appId: "1:166740736870:web:30575439ff8a226825a6a7"
});


export const Context = createContext(null)

const auth = getAuth(app);
const database = getFirestore(app)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Context.Provider value={{
    auth,
    app,
    database
  }}>
    <App />
  </Context.Provider>

);


