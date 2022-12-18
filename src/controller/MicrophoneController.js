import { ClassEvents } from "../Utils/ClassEvents";

export class MicrophoneController extends ClassEvents{
    constructor(){
        super();

        this._available = false;
        this.mimeType = 'audio/webm';

        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream=>{

            this._available = true;

            this._stream = stream;
            this.trigger('ready', this._stream);
        }).catch(err=>{
            console.log(err)
        });
    };

    isAvailable(){
        return this._available;
    };

    stopMedia(){
        this._stream.getTracks().forEach(trak=>{
            trak.stop();
        });
    };

    startRecord(){
        if(this.isAvailable()){
            this._mediaRecord = new MediaRecorder(this._stream, {
                mimeType: this.mimeType
            });

            this._recordedChuncks = [];

            this._mediaRecord.addEventListener('dataavailable', e=>{
                if (e.data.size > 0) this._recordedChuncks.push(e.data);
            });

            this._mediaRecord.addEventListener('stop', e=>{
                let blob = new Blob(this._recordedChuncks,{
                    type: this.mimeType
                });

                let fileName = `record_timeStamp${Date.now()}.webm`;
                let fileWeb = new File([blob],fileName, {
                    type: this.mimeType,
                    lastModified: Date.now()
                });
                console.log(fileWeb)
                let reader = new FileReader();
                reader.onload = e =>{
                    let audio = new Audio(reader.result);
                    audio.play();
                };
                reader.readAsDataURL(fileWeb);
            });

            this._mediaRecord.start();
        };

    };

    stopRecord(){
        if(this.isAvailable()){

            this._mediaRecord.stop();
            this.stopMedia();
            
        };
    };
};