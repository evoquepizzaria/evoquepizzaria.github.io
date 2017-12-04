
var config = {
    apiKey: "AIzaSyDyz_DNncBIBsqvu9frV2xVMwW2XiHgBVA",
    authDomain: "evoque-pizzaria.firebaseapp.com",
    databaseURL: "https://evoque-pizzaria.firebaseio.com",
    projectId: "evoque-pizzaria",
    storageBucket: "evoque-pizzaria.appspot.com",
    messagingSenderId: "120811179368"
}
        
firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();

