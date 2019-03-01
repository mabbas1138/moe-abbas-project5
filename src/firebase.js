import firebase from 'firebase'

  const config = {
      apiKey: "AIzaSyC_OUVVHrV6yJ5MvNmUz78bsr4ufFt4qwk",
      authDomain: "moe-abbas-project5.firebaseapp.com",
      databaseURL: "https://moe-abbas-project5.firebaseio.com",
      projectId: "moe-abbas-project5",
      storageBucket: "moe-abbas-project5.appspot.com",
      messagingSenderId: "787000366419"
  };
  firebase.initializeApp(config); 

  export default firebase;