 "use strict";
 
        ////////////////////////////////////////// 
        // Initialize Firebase
        var config = {  apiKey:             "AIzaSyBC0OhmkRaPCXNL49cFawYoOU3zTOiR-uw",
                        authDomain:         "mysekolah-a5654.firebaseapp.com",
                        databaseURL:        "https://mysekolah-a5654.firebaseio.com",
                        storageBucket:      "mysekolah-a5654.appspot.com",
                        messagingSenderId:  "609726729365"
                      };
        firebase.initializeApp(config);
        var fbRef = firebase.database().ref("data");