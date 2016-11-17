//TODO: FIGURE OUT FOLLOWING
//TODO: FIGURE OUT LIVE FEED
//TODO: FIGURE OUT PROFILE INFO
//TODO: ADD SETTINGS
//TODO: ADD LOADING SCREEN
//TODO: LINK CODES TO PROFILES
//TODO: LOGIN ERROR WINDOWS
//TODO: LOST PASSWORD
//TODO: LIVE POSTING
//TODO: SEARCH, CALENDAR, PROFILE
//TODO: SEPEARE FUNCTIONS INTO DIFFERENT PAGES



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
	const btnCreateEvent = document.getElementById('btnCreateEvent');
	const btnCloseEvent = document.getElementById('btnCloseEvent');
	const btnCloseAccountWindow = document.getElementById('btnCloseAccountWindow');

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
			showCreateAccountWindow();
			console.log('Did not create account');
		}
		var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
		ref.onAuth(function (authData) {
			if (authData && isNewUser) {
				ref.child("users").child(authData.uid).set({
					provider: authData.provider,
					name: getName(authData)
				});
			}
		});
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
		} else if (schoolCode == '') {
			showCreateAccountWindow();
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
			console.log("Correct code!");
		} else if (adminCode == '') {
			console.log("no code entered")
		} else {
			console.log("Incorect code!");
		}
	}
	//Show create event window

	btnCreateEvent.addEventListener('click', e => {
		showCreateEventWindow();
	});

	//Hide create event window 
	btnCloseEvent.addEventListener('click', e => {
		hideCreateEventWindow();
	});

	//Hide register window 
	btnCloseAccountWindow.addEventListener('click', e => {
		hideCreateAccountWindow();
	});
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

	function showCreateEventWindow() {
		$("#createEventForm").addClass("show");
		$("#createEventForm").removeClass("hide");
		$(".blackout").addClass("show");
		$(".blackout").removeClass("hide");
	}

	function hideCreateEventWindow() {
		$("#createEventForm").addClass("hide");
		$("#createEventForm").removeClass("show");
		$(".blackout").addClass("hide");
		$(".blackout").removeClass("show");
	}

	function showCreateAccountWindow() {
		$("#createAccountWindow").addClass("show");
		$("#createAccountWindow").removeClass("hide");
	}

	function hideCreateAccountWindow() {
		$("#createAccountWindow").addClass("hide");
		$("#createAccountWindow").removeClass("show");
	}

	function showCreatePost() {
		$("#btnCreateEvent").addClass("show");
		$("#btnCreateEvent").removeClass("hide");
	}

	function showErrorWindow() {
		$("#errorWindow").addClass("show");
		$("#errorWindow").removeClass("hide");
	}

	function hideErrorWindow() {
		$("#errorWindow").addClass("hide");
		$("#errorWindow").removeClass("show");
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
		//Hide Login Errors
		hideCreateAccountWindow();
		hideErrorWindow();
		//Hide logout
		hideLogout();
		//Console
		console.log('logged out');
	}
	const preObject = document.getElementById("object");
	const dbRefObject = firebase.database().ref().child("object");
	dbRefObject.on("value", snap => {
		preObject.innerText = JSON.stringify(snap.val(), null, 3)
	});

}());
