var fbadmin = require('firebase-admin');
var serviceAccount = require("../accountKey.json");

fbadmin.initializeApp({
  credential: fbadmin.credential.cert(serviceAccount),
  databaseURL: "https://spicy-wishboard.firebaseio.com"
});

module.exports = {
  auth: fbadmin.auth(),
  db: fbadmin.database()
}