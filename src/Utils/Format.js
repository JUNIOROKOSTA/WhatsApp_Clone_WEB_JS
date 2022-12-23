export class Format {

    /*
    getCamelCase -> Método que recebe nome da uma classe ou ID HTML/CSS
    e retornar seu nome em formato CamelCase.
    Exemplo: "#btn-submit" => "btnSubmit"
    */
    static getCamelCase(element){
        let div = document.createElement('div');
        div.innerHTML = `<divi data-${element}="id"></div>`;
        return Object.keys(div.firstChild.dataset)[0];
    }

    static toFormatTime(time){
        let seconds = parseInt((time / 1000 ) % 60);
        let minutes = parseInt((time / (1000*60) ) % 60);
        let hours = parseInt((time / (1000*60*60) ) % 24);

        minutes = minutes.toString().padStart(2,'0')
        seconds = seconds.toString().padStart(2,'0')
        if(hours > 0){
            return `${hours}:${minutes}:${seconds}`
        } else{
            return `${minutes}:${seconds}`
            
        }
    };

    static dateToTime(date, locale = 'pt-BR'){
        let todate = date.toDate()
        return todate.toLocaleTimeString(locale,{
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    static timeStampToTime(ts){
        return (ts && typeof ts.toDate === 'function') ? 
        Format.dateToTime(ts) : '';
    }
};