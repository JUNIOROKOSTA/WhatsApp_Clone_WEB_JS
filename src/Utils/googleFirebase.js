
export class Firebase{
    constructor(){
        this.initFirebase();
        
    };

    initFirebase(){
        const firebaseConfig ={
            apiKey: "AIzaSyAlqgkrtC0PAzVhaUv1c-rYtAwDyBhRbjE",
            authDomain: "clone-zap-9165b.firebaseapp.com",
            projectId: "clone-zap-9165b",
            storageBucket: "clone-zap-9165b.appspot.com",
            messagingSenderId: "442901650238",
            appId: "1:442901650238:web:254951627d3255c751ea6f"
          };
        firebase.initializeApp(firebaseConfig)
    }
    getdb(){
        const db = firebase.firestore();

        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
            });
        });
};
};