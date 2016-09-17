//TODO: FIGURE OUT FOLLOWING
//TODO: FIGURE OUT LIVE FEED
//TODO: FIGURE OUT PROFILE INFO
//TODO: ADD SETTINGS



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
	const btnLogoutContainer = document.getElementById('btnLogoutContainer');
	const login = document.getElementById('login');
	const txtSchoolCode = document.getElementById('txtSchoolCode');
	const txtAdminCode = document.getElementById('txtAdminCode');

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
		const schoolCode = txtSchoolCode.value;
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();
		//Sign up
		if (schoolCode !== '') {
			checkSchoolCode();
			const promise = auth.createUserWithEmailAndPassword(email, pass);
			promise.catch(e => console.log(e.message));
		} else {
			console.log('Did not create account');
		}
	});

	btnLogout.addEventListener('click', e => {
		firebase.auth().signOut();
	});

	//Add realtime event listener
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			//Loged in 
			//Console
			console.log('Logged in!');
			//Hide login
			hideLogin();
			hideDark();
			//Show feed
			showFeed();
			//Show logout
			showLogout();
			//Check for School Code;
			checkSchoolCode();
		} else {
			logOutFunctions();
		}
	});

	//Setting the user's school code

	function checkSchoolCode() {
		const schoolCode = txtSchoolCode.value;
		if (schoolCode == "0000") {
			showWHS();
			checkForAdmin();
		} else {
			console.log("incorrect school code");
			firebase.auth().signOut();
		}
	}

	//Check for admin
	function checkForAdmin() {
		const adminCode = txtAdminCode.value;
		if (adminCode == "thisisanadmin") {
			showCreatePost();
		} else if (adminCode == '') {
			console.log("no code entered")
		} else {
			console.log("Incorect code!");
		}
	}

	//Functions to show/hide things

	function showLogin() {
		$("#login").addClass("show");
		$("#login").removeClass("hide");
	}

	function hideLogin() {
		$("#login").removeClass("show");
		$("#login").addClass("hide");
	}

	function hideLogout() {
		$("#btnLogoutContainer").addClass("show");
		$("#btnLogoutContainer").removeClass("hide");
	}

	function hideDark() {
		$(".dark").removeClass("show");
		$(".dark").addClass("hide");
	}

	function hideFeed() {
		$("#feed").removeClass("show");
		$("#feed").addClass("hide");
	}

	function showDark() {
		$(".dark").addClass("show");
		$(".dark").removeClass("hide");
	}

	function showFeed() {
		$("#feed").addClass("show");
		$("#feed").removeClass("hide");
	}

	function showLogout() {
		$("#btnLogoutContainer").addClass("show");
		$("#btnLogoutContainer").removeClass("hide");
	}

	function hidePages() {
		$(".page").addClass("hide");
		$(".page").removeClass("show");
	}

	function showWHS() {
		$(".WHS").addClass("show");
		$(".WHS").removeClass("hide");
		$(".post").addClass("hide");
		$(".user").addClass("hide");
	}

	function showCreatePost() {
		$("#createPost").addClass("show");
		$("#createPost").removeClass("hide");
	}
	//Logout Functions
	function logOutFunctions() {
		//Not loged in
		//Show login
		showLogin();
		showDark();
		//Hide pages
		hidePages();
		hideFeed();
		//Hide logout
		hideLogout();
		//Console
		console.log('logged out');
	}
}());
