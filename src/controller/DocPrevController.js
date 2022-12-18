const pdfjsLib = require('pdfjs-dist');
const path = require('path');
pdfjsLib.GlobalWorkerOptions.workerSrc = path.resolve(__dirname, '../../dist/pdf.worker.bundle.js')
export class DocPrevController{
    constructor(file){
        this._file = file;
    };

    getPreviewData(){
        return new Promise((sucess , failed)=>{
            let reader = new FileReader();

            switch (this._file.type){
                case 'image/png':
                case 'image/jpeg':
                case 'image/jpg':
                case 'image/gif':
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
                    reader.onload = e =>{
                        pdfjsLib.getDocument(new Uint8Array(reader.result)).then(pdf=>{
                            pdf.getPage(1).then(page=>{
                                let viewport = page.getViewport(1);
                                let canvas = document.createElement('canvas');
                                let canvasContext = canvas.getContext('2d')

                                canvas.width = viewport.width;
                                canvas.height = viewport.height;

                                page.render({
                                    canvasContext,
                                    viewport
                                }).then(()=>{
                                    let pages = (pdf.numPages > 1) ? "s" : "";
                                    sucess({
                                        src: canvas.toDataURL('image/png'),
                                        info: `${pdf.numPages} página${pages}`
                                    });
                                }).catch(err=>{
                                    failed(err)
                                });

                            }).catch(error=>{
                                failed(error)
                            })

                        }).catch(error=>{
                            failed(error)
                        })

                    };
                    reader.readAsArrayBuffer(this._file)

                break;

                default:
                    failed();

            }
        })
    };
}