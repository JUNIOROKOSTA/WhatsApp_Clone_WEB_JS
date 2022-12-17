export class CameraController{
    constructor(){
        this._videoEl = document.getElementById('video-camera');

        const specs = {video:{width: 1080}}

        navigator.mediaDevices.getUserMedia(specs).then(stream=>{
            this._stream = stream
           this._videoEl.srcObject = stream;
           this._videoEl.play();

        }).catch(error =>{
            console.error(error)
        });

    }

    stopMedia(){
        this._stream.getTracks().forEach(trak=>{
            trak.stop();
        });
    }

    takePicture(mimeType = "image/png"){
        let canvas = document.createElement('canvas')

        canvas.setAttribute('height', this._videoEl.videoHeight)
        canvas.setAttribute('width', this._videoEl.videoWidth)

        let canvasContext = canvas.getContext('2d');
        canvasContext.drawImage(this._videoEl,0,0,canvas.width, canvas.height);

        return canvas.toDataURL(mimeType);
    }
}