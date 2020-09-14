class App{
    _state = {
        log: [],
        cached_data: null,
        feriados: null,
        countdown: null
    }

    static _instance = null;


    static getInstance(){
        if (this._instance) return this._instance;

        App._instance = new App();
        return App._instance;
    }

    async start() {
        console.log('Initializing...');

        await Server.request('/dates')
            .then(data => {
                this._state.cached_data = data;
                console.log({message: "Server Data Fetched"});
            })
            .catch(reason =>{
                console.log(reason);
                throw new Error(reason);
            });

        this._state.feriados = FeriadoBuilder.build(this._state.cached_data);

        this._state.countdown = new Countdown();

        this.state.countdown.from(this.state.feriados[0].next.date).start();

        const select = document.getElementById('holiday-selector');


        for(let feriado of this.state.feriados){
            const option = this._createElement('option', {
                class: 'option',
                value: feriado.name
            });

            option.innerHTML = feriado.name
            select.appendChild(option);
        }

        select.addEventListener('change', e => {
            const f = this.state.feriados[select.selectedIndex];
            this.state.countdown.from(f.next.date).start();
        });
    }


    async stop() {
        console.log('Closing Services...');
        this.state.countdown.stop();
        App._instance = null;
    }

    get state(){
        return this._state;
    }

    _createElement(tagName, attributes={}){
        const el = document.createElement(tagName);
        for (const [attr, value] of Object.entries(attributes)) {
            el.setAttribute(attr, value);
        }

        return el
    }

}
