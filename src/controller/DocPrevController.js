export class DocPrevController{
    constructor(file){
        this._file = file;
    };

    getPreviewData(){
        return new Promise((sucess , failed)=>{
            switch (this._file.type){
                case 'image/png':
                case 'image/jpeg':
                case 'image/jpg':
                case 'image/gif':
                    let reader = new FileReader();
                    reader.onload = e=>{
                        sucess({
                            src: reader.result,
                            info: this._file.name
                        });
                    };
                    reader.onerror = e=>{
                        failed(e)
                    };
                    reader.readAsDataURL(this._file)

                break;

                case 'application/pdf':
                    console.log('PDF')
                break;

                default:
                    failed();

            }
        })
    };
}