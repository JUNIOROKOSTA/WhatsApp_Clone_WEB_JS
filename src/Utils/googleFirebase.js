import {auth} from '../../node_modules/firebase/auth';
export class FireBase{
    constructor(){
        this.init();
    };

    init(){
        if(!this._initialized){
            const config = {
                apiKey: "AIzaSyDFU59YcOcWkDfCNEy2d_zAzFY9U4mYwtQ",
                authDomain: "whatsapp-clone-okosta88.firebaseapp.com",
                projectId: "whatsapp-clone-okosta88",
                storageBucket: "whatsapp-clone-okosta88.appspot.com",
                messagingSenderId: "27959259023",
                appId: "1:27959259023:web:16cf0d4349cf089cd965fa"
              };
            this.app = initializeApp(config);
            this._initialized = true;
        };

    };

    initAuth(){
        return new Promise((sucess, failed)=>{
            this.app.auth().si
        })
    }

    static bd(){
        return this.app.firestore();
    };

    static hd(){
        return this.app.storage();
    };

};