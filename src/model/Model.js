import { ClassEvents } from "../Utils/ClassEvents";

export class Model extends ClassEvents{
    constructor(){
        super();
        this._data = {};
    }

    fromJSON(json){
        this._data = Object.assign(this._data, json);
        this.trigger('datachange', this.toJSON());
    };

    toJSON(doc){
        return this._data;
    }
}