export class Base64{
    
    static getMimeType(urlBase64){
        let regex = /^data:(.+);base64,(.*)$/;
        let result = urlBase64.match(regex);
        return result[1];
    };

    static toFile(urlBase64){
        let mimeType = Base64.getMimeType(urlBase64);
        let ext = mimeType.split('/')[1];
        let fileName = `file_${Date.now()}.${ext}`;

        return fetch(urlBase64).then(
            res=>{ return res.arrayBuffer();}
        ).then(
            buffer=>{return new File([buffer], fileName, { type: mimeType});}
        )
    }
}