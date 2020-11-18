import React from 'react';
import ReactDOM from 'react-dom';
import '@/styles/global.scss';
// import firebase from 'firebase';
import App from './App';

// firebase.initializeApp({
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESAGGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// });

ReactDOM.render(<App />, document.getElementById('root'));
