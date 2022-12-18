export class ClassEvents{
    constructor(){
        this._events = {};

    };

    on(eventName, func){
        if(!this._events[eventName]) this._events[eventName] = new Array();

        this._events[eventName].push(func);
    };

    trigger(){
        // Usando arqguments para receber n argumentos nesse method.
        let args = [...arguments];// Usando spread para transformar 
                                 // os argumentos em um Array
        let eventName = args.shift();// .shift para remover 
                                    //e retorna a primeira posição do Array

        args.push(new Event(eventName));

        if(this._events[eventName] instanceof Array){
            this._events[eventName].forEach(func => {
                func.apply(null, args);
            });
        }
    };
};