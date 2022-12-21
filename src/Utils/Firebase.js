
export class Firebase{
    constructor(){
        this.initFirebase();
        
    };

    initFirebase(){
        const firebaseConfig ={
            apiKey: "AIzaSyDt5Pgi2hf_GlwzIumKoIanH-Iws6MoKiw",
            authDomain: "whatsappclone2022-9504a.firebaseapp.com",
            projectId: "whatsappclone2022-9504a",
            storageBucket: "whatsappclone2022-9504a.appspot.com",
            messagingSenderId: "212875704640",
            appId: "1:212875704640:web:da62dd9117058ddc03e2a5"
        };
          if(!window._initializedFirebase){
            firebase.initializeApp(firebaseConfig)

            window._initializedFirebase = true;

            // firebase.firestore().settings({
            //     timestampsInSnapshots: true
            // });
        };
        
    }; // END  initFirebase

    initAuth(){
        return new Promise((sucess, failed)=>{
        let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
            .then(result=>{
                let credential = result.credential;
                let token = credential.accessToken;
                let user = result.user;

                sucess({user, token});
            })
            .catch(err=>{
                failed(err)
            });
        })
    }

    static db(){
        return firebase.firestore();
    }; // END db

    static hd(){
        return firebase.storage();
    };// END hd

};


