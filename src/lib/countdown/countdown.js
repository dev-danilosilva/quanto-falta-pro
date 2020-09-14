class Countdown {
    constructor(daysId="days",
                hoursId='hours',
                minutesId='minutes',
                secondsId='seconds') {

        const dayEl = document.getElementById(daysId);
        this.dayEl = dayEl? dayEl : this._createElement('h2', {id: daysId});

        const hoursEl = document.getElementById(hoursId);
        this.hoursEl = hoursEl ? hoursEl : this._createElement('h2', {id: hoursId});

        const minutesEl = document.getElementById(minutesId);
        this.minutesEl = minutesEl ? minutesEl : this._createElement('h2', {id: minutesId});

        const secondsEl = document.getElementById(secondsId);
        this.secondsEl = secondsEl ? secondsEl : this._createElement('h2', {id: secondsId});

        this._fromDate = null;

        this._days = 0;
        this._hours = 0;
        this._minutes = 0;
        this._seconds =  0;
    }

    getViewObjects(){
        return {
            days: this.dayEl,
            hours: this.hoursEl,
            minutes: this.minutesEl,
            seconds: this.secondsEl
        }
    }

    from(countdownFrom){
        this._fromDate = countdownFrom;
        return this;
    }

    start(){
        if (this.scheduler) clearInterval(this.scheduler);

        const f = () => {
            const delta = (this._fromDate - new Date()) / 1000;

            this._days = Math.floor((delta / 3600 / 24));
            this._hours = Math.floor((delta / 3600) % 24);
            this._minutes = Math.floor((delta / 60) % 60);
            this._seconds = Math.floor((delta % 60));

            this.dayEl.innerHTML = this._days;
            this.hoursEl.innerHTML = this._hours;
            this.minutesEl.innerHTML = this._minutes;
            this.secondsEl.innerHTML = this._seconds;

        }

        this.scheduler = setInterval(f, 1000);
    }

    stop(){
        clearInterval(this.scheduler);
    }

    _createElement(tagName, attributes={}){
        const el = document.createElement(tagName);
        for (const [attr, value] of Object.entries(attributes)) {
            el.setAttribute(attr, value);
        }

        return el
    }

}
