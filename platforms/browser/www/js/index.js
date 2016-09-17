(function () {
	var config = {
		apiKey: "AIzaSyCzmfRZlO50OPPOJdzFZGzCAKJc14gDwVM",
		authDomain: "my-resource-time.firebaseapp.com",
		databaseURL: "https://my-resource-time.firebaseio.com",
		storageBucket: "my-resource-time.appspot.com",
	};
	firebase.initializeApp(config);

	//Get elements 
	const txtEmail = document.getElementById('txtEmail');
	const txtPassword = document.getElementById('txtPassword');
	const btnLogin = document.getElementById('btnLogin');
	const btnSignUp = document.getElementById('btnSignUp');
	const btnLogout = document.getElementById('btnLogout');

	//Add login event
	btnLogin.addEventListener('click', e => {
		//Get email and password fields
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();
		//Sign in
		const promise = auth.signInWithEmailAndPassword(email, pass);
		promise.catch(e => console.log(e.message));
	});

	//Add signup event
	btnSignUp.addEventListener('click', e => {
		//Get email and password fields
		//TODO: check for real email
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();
		//Sign up
		const promise = auth.createUserWithEmailAndPassword(email, pass);
		promise.catch(e => console.log(e.message));
	});

	btnLogout.addEventListener('click', e => {
		firebase.auth().signOut();
	});

	//Add realtime event listener
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			console.log(user);
		} else {
			console.log('not logged in');
		}
	});

}());
