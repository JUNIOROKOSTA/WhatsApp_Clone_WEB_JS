import firebase from 'firebase/app'
//import 'firebase/auth'
import 'firebase/storage'

export class FireBase{
    constructor(){
        this._config ={
            apiKey: "AIzaSyDFU59YcOcWkDfCNEy2d_zAzFY9U4mYwtQ",
            authDomain: "whatsapp-clone-okosta88.firebaseapp.com",
            projectId: "whatsapp-clone-okosta88",
            storageBucket: "whatsapp-clone-okosta88.appspot.com",
            messagingSenderId: "27959259023",
            appId: "1:27959259023:web:16cf0d4349cf089cd965fa"
          };

        this.init();

    }

    init(){
        if(!window._initialized){
            firebase.initializeApp(this._config);

            window._initialized = true;

            firebase.firestore().settings({
                timestampsInSnapshots: true
            });
        };

    };

    static bd(){
        return firebase.firestore();
    };

    static hd(){
        return firebase.storage();
    };

};