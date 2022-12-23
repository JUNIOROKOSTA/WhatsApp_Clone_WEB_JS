import { Firebase } from "../Utils/Firebase";
import { Model } from "./Model";

 export class User extends Model{
    constructor(email){
        super();

        if (email) this.getById(email);
    };

    get name(){return this._data.name};
    set name(value){this._data.name = value};

    get email(){return this._data.email};
    set email(value){this._data.email = value};

    get photo(){return this._data.photo};
    set photo(value){this._data.photo = value};

    get chatId(){return this._data.chatId};
    set chatId(value){this._data.chatId = value};

    getById(id){
        return new Promise((sucess, failed)=>{
            User.findEmail(id).onSnapshot(doc=>{
                this.fromJSON(doc.data())
                sucess(doc)
            });
        });
    };

    save(){
        return User.findEmail(this.email).set(this.toJSON());
    }

    static getRef(){
        return Firebase.db().collection('/users')
    };

    static findEmail(email){
        return User.getRef().doc(email);
    }

    convertBase64(str){
        return btoa(str);
    }

    static getRefContacts(id){
        return User.getRef().doc(id).collection('contacts')

    }

    addContact(contact){
        return User.getRefContacts(this.email)
        .doc(this.convertBase64(contact.email)).set(contact.toJSON())
    };

    getContacts(filter = ''){
        return new Promise((sucess, failed)=>{
            User.getRefContacts(this.email).where('name', '>=', filter).onSnapshot(docs =>{
                let contacts = [];
                docs.forEach(doc => {
                    let data = doc.data();
                    data.id = doc.id;

                    contacts.push(data);
                });
                this.trigger('contactschange', docs)
                sucess(contacts);
            });
        }).catch(err=>{
            failed(err)
        });
    }
 }