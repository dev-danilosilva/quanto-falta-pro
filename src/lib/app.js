class App{
    _state = {
        log: [],
        cached_data: null,
        feriados: null
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

        const countdown = new Countdown();

        countdown.from(this.state.feriados[0].next.date).start();
    }

    async stop() {
        console.log('Closing Services...');
        App._instance = null;
    }

    get state(){
        return this._state;
    }

}
