import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
	apiKey: "AIzaSyBS7j4SUFdZ6KoE3AqvhFJbQ6ON_9q05Nc",
	authDomain: "imvu-vcoin-dashboard-test.firebaseapp.com",
	databaseURL: "https://imvu-vcoin-dashboard-test.firebaseio.com",
	projectId: "imvu-vcoin-dashboard-test",
	storageBucket: "imvu-vcoin-dashboard-test.appspot.com",
	messagingSenderId: "542956967549",
	appId: "1:542956967549:web:e9cdf6641505b2c76c8314",
	measurementId: "G-6ZN8RK09TW",
});

export const auth = app.auth();
export default app;
