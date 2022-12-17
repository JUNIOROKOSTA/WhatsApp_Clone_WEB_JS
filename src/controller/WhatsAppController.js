class WhatsAppController {
    constructor() {
        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
    };
    /*
    loadElements -> Método procura todos os [id] da pagina HTML
    Envia cada name de #id encontrado para um Método que retorna o nome do id
    em formato CamelCase.(Format é a classe, e getCamelCase é o método).
    
    */
    loadElements() {
        this.el = {};
        document.querySelectorAll('[id]').forEach(element => {
            this.el[Format.getCamelCase(element.id)] = element;
        });

    }; // END ---> loadElements

    elementsPrototype() {
        // Method-> Mostrar ou Esconder Elementos HTML.
        Element.prototype.hide = function() {
            this.style.display = 'none';
            return this;
        };

        Element.prototype.show = function() {
            this.style.display = 'block';
            return this;
        };

        Element.prototype.toggleDisplay = function() {
            this.style.display = (this.style.display === 'none') ? 'block' : 'none';
            return this;
        };

        // Method-> adiciona Eventos nos Elementos HTML.
        Element.prototype.on = function(events, func) {
            events.split(' ').forEach(event => {
                this.addEventListener(event, func);
            });
            return this;
        };


        // Method-> adiciona Estilos CSS nos Elementos HTML.
        Element.prototype.css = function(styles) {
            for (let name in styles) {
                this.style[name] = styles[name];
            };
            return this;
        };

        // Method-> adiciona e Remove Classe nos Elementos HTML.
        Element.prototype.addClass = function(name) {
            this.classList.add(name);
            return this;
        };
        Element.prototype.removeClass = function(name) {
            this.classList.remove(name);
        };
        Element.prototype.toggleClass = function(name) {
            this.classList.toggle(name);
            return this;
        };

        // Method-> verifica se existe a classe nos Elementos HTML.
        Element.prototype.hasClass = function(name) {
            return this.classList.contains(name);
        };

        HTMLFormElement.prototype.getForm = function() {
            return new FormData(this)
        };

        HTMLFormElement.prototype.toJSON = function() {

            let json = {};
            this.getForm().forEach((value, key)=>{
                json[key] = value;
            })
            return json
        };

    }; // END ---> elementsPrototype


    initEvents() {

        this.el.myPhoto.on('click', e => {
            this.hideAllPanelLeft();
            this.el.panelEditProfile.show();
            setTimeout(() => {
                this.el.panelEditProfile.addClass('open');

            }, 280)
        });

        this.el.btnNewContact.on('click', e => {
            this.hideAllPanelLeft();
            this.el.panelAddContact.show();

            setTimeout(() => {
                this.el.panelAddContact.addClass('open');

            }, 280)
        });

        this.el.btnClosePanelEditProfile.on('click', e => {
            this.el.panelEditProfile.removeClass('open');

        });

        this.el.btnClosePanelAddContact.on('click', e => {
            this.el.panelAddContact.removeClass('open');

        });

        this.el.photoContainerEditProfile.on('click', e => {
            this.el.inputProfilePhoto.click();
        });

        this.el.inputNamePanelEditProfile.on('keypress', e => {
            if (e.key === 'Enter') {
                e.preventDefault();

                this.el.btnSavePanelEditProfile.click();

            };
        });

        this.el.btnSavePanelEditProfile.on('click', e => {
            console.log(this.el.inputNamePanelEditProfile.innerHTML)
        });

        this.el.formPanelAddContact.on('submit', e=>{
            e.preventDefault();
            let formData = this.el.formPanelAddContact.getForm();
        });

        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item=>{
            item.on('click', e=>{
                this.el.home.hide();

                this.el.main.css({
                    display: 'flex'
                });
            });
        });

        this.el.btnAttach.on('click', e=>{
            e.stopPropagation();
            this.el.menuAttach.addClass('open');
            document.addEventListener('click', this.closeMenuAttach.bind(this));
        });

        this.el.btnAttachPhoto.on('click', e=>{
            this.el.inputPhoto.click();

        });

        this.el.inputPhoto.on('change', e=>{
            console.log('Foto', this.el.inputPhoto.files);
            [...this.el.inputPhoto.files].forEach(file =>{
                console.log(file)
            });

        });
        
        this.el.btnAttachCamera.on('click', e=>{
            this.el.panelMessagesContainer.hide();
            this.el.panelCamera.addClass('open');
            this.el.panelCamera.css({
                "height": '100%'
            });

            this._camera = new CameraController(this.el.videoCamera);
        });

        this.el.btnClosePanelCamera.on('click', e=>{
            this.el.panelMessagesContainer.show();

            this.el.panelCamera.removeClass('open');
        });

        this.el.btnTakePicture.on('click', e=>{
            console.log('btn-take-picture')
        });

        this.el.btnAttachDocument.on('click', e=>{
            this.el.panelMessagesContainer.hide();
            this.el.panelDocumentPreview.addClass('open');
            this.el.panelDocumentPreview.css({
                "height": '100%'
            });
        });

        this.el.btnClosePanelDocumentPreview.on('click', e=>{
            this.el.panelMessagesContainer.show();
            this.el.panelDocumentPreview.removeClass('open');
        });

        this.el.btnSendDocument.on('click', e=>{
            console.log('btn-send-document')
        });

        
        this.el.btnAttachContact.on('click', e=>{
            this.el.modalContacts.show();

        });

        this.el.btnCloseModalContacts.on('click', e=>{
            this.el.modalContacts.hide();
        });

        this.el.btnSendMicrophone.on('click', e=>{

            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide();
            console.log('btnSendMicrophone')
            this.recordMicrophoneTime();

        });

        this.el.btnCancelMicrophone.on('click', e=>{
            this.closedRecordMicrophone();
        });

        this.el.btnFinishMicrophone.on('click', e=>{
            this.closedRecordMicrophone();
        });

        this.el.inputText.on('keypress', e=>{
            if(e.key === 'Enter' && !e.ctrlKey){
                e.preventDefault();
                this.el.btnSend.click();
            };
        });

        this.el.inputText.on('keyup', e=>{
            if(this.el.inputText.innerHTML.length){
                this.el.inputPlaceholder.hide();
                this.el.btnSendMicrophone.hide();
                this.el.btnSend.show();
            } else{
                this.el.inputPlaceholder.show();
                this.el.btnSendMicrophone.show();
                this.el.btnSend.hide();
            };
  
        });

        this.el.btnSend.on('click', e=>{
            let text = this.el.inputText.innerHTML
            console.log(text)
        });

        this.el.btnEmojis.on('click', e=>{
            this.el.panelEmojis.toggleClass('open');
        });

        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji=>{
            emoji.on('click', e=>{
                
                // this.el.inputText.innerHTML += (emoji.dataset.unicode)
                // this.el.inputPlaceholder.hide();
                // this.el.btnSendMicrophone.hide();
                // this.el.btnSend.show();

                let imgEmoji = this.el.imgEmojiDefault.cloneNode();
                imgEmoji.style.cssText = emoji.style.cssText;
                imgEmoji.dataset.unicode = emoji.dataset.unicode;
                imgEmoji.alt = emoji.dataset.unicode;

                emoji.classList.forEach(name=>{
                    imgEmoji.classList.add(name);
                });

                let cursor = window.getSelection();

                if (!cursor.focusNode || !cursor.focusNode.id == 'input-text'){
                    this.el.inputText.focus();
                    cursor = window.getSelection();
                };
                
                let range = document.createRange();
                range = cursor.getRangeAt(0);
                range.deleteContents();

                let fragment = document.createDocumentFragment();
                fragment.appendChild(imgEmoji);
                range.insertNode(fragment);
                range.setStartAfter(imgEmoji)

                // dispatchEvent -> Força/disparar o Evento...
                this.el.inputText.dispatchEvent(new Event('keyup'));

            });
        });

        
        
        


    }; // END ---> initEvents

    hideAllPanelLeft() {
        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();


    }; // END ---> hideAllPanelLeft

    closeMenuAttach(eve){

        document.removeEventListener('click', this.closeMenuAttach);
        this.el.menuAttach.removeClass('open')

    };// END ---> closeMenuAttach

    closedRecordMicrophone(){
        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
        clearInterval(this._recordMicrophoneInterval)
    };// END ---> closedRecordMicrophone

    recordMicrophoneTime(){

        let start = Date.now();
        this._recordMicrophoneInterval = setInterval(()=>{
            this.el.recordMicrophoneTimer.innerHTML = Format.toFormatTime(Date.now()- start);
        }, 100);
 
    };// END ---> recordMicrophoneTimer


}; // END ---> Class WhatsAppController