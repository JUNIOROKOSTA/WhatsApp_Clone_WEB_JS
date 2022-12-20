import { initializeApp } from "firebase/app";
import { firestore } from 'firebase/firestore';
import { storage} from 'firebase/storage';

export class Firebase{
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

        const app = initializeApp(firebaseConfig);

    };

}