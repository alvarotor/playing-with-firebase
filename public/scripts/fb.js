firebase.initializeApp({
    apiKey: "AIzaSyDdmCg3nh7dPgyWBY0rtiBkaO7OxFqxMgQ",
    authDomain: "trankilo-a6266.firebaseapp.com",
    databaseURL: "https://trankilo-a6266.firebaseio.com",
    storageBucket: "trankilo-a6266.appspot.com",
    messagingSenderId: "641189687266"
});
var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function (snap) {
    if (snap.val() === true)
        console.log("connected");
    else
        console.log("not connected");
});