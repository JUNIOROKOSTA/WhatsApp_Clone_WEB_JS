import { Firebase } from "../Utils/Firebase";
import { Model } from "./Model";

export class Chat extends Model{
    constructor(){
        super();
    }

    get users(){return this._data.users};
    set users(value){this._data.users = value};

    get timeStamp(){return this._data.timeStamp};
    set timeStamp(value){this._data.timeStamp = value};

    static getRefChat(){ return Firebase.db().collection('/chats')}

    static createChat(meEmail, contactEmail){
        return new Promise((sucess, failed)=>{
            let users = {};
            users[btoa(meEmail)] = true;
            users[btoa(contactEmail)] = true;

            Chat.getRefChat().add({
                users,
                timeStamp: new Date()
            }).then(doc=>{
                Chat.getRefChat().doc(doc.id).get()
                .then(onChat=>{
                    sucess(onChat);

                })
                .catch(err=>{failed(err)});
            })
            .catch(err=>{failed(err)})
        })

    }

    static findChat(meEmail, contactEmail){
        // Usando método "where" do firebase para procurar dentro da base de dados
        // where(OqueEstouProocurando, OperadoDeComparação, Valor)
        // OperadoDeComparação -> '==', '>', '<', '!=' ...
        return Chat.getRefChat()
        .where(btoa(meEmail), '==', true)
        .where(btoa(contactEmail), '==', true).get();
    }

    static createIfNotExists(meEmail, contactEmail){
        return new Promise((sucess, failed)=>{
            Chat.findChat(meEmail, contactEmail).then(chats=>{
                if(chats.empty){
                    Chat.createChat(meEmail, contactEmail).then(chat=>{
                        sucess(chat);
                    });
                } else{
                    chats.forEach(chat => {
                        sucess(chat);
                    });
                };
            }).catch(err=>{
                failed(err)
            });
        })
    }
}