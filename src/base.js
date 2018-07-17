import Rebase from 're-base';
import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA1KVlw6QnVWVfTrNezfT4FVOrHFr64MI8',
  authDomain: 'catch-of-the-day-donte.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-donte.firebaseio.com'
};

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

export default base;
