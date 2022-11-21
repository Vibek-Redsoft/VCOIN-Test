import "firebase/auth";
import firebase from "firebase/app";

const app = firebase.initializeApp({
	apiKey: "AIzaSyDJ8bkcxrqZoUUVckox5a2GQv56Radv33s",
	authDomain: "imvu-vcoin-dashboard.firebaseapp.com",
	databaseURL: "https://imvu-vcoin-dashboard.firebaseio.com",
	projectId: "imvu-vcoin-dashboard",
	storageBucket: "imvu-vcoin-dashboard.appspot.com",
	messagingSenderId: "1032075483864",
	appId: "1:1032075483864:web:407e5c151d8a99f31315ad",
	measurementId: "G-WHQYBMP6YG",
});

export const auth = app.auth();
export default app;
