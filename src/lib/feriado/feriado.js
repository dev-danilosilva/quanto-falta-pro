class Feriado{
    constructor(label='', day=1, month=1, periodicity=1) {
        const today= Dated.current;
        const year = today.lessThan(new Dated(day, month, today.year)) ? today.year : today.year + periodicity
        this._date = new Dated(day, month,year);
        this._label = label;
    }

    get next(){
        return this._date
    }

    get name(){
        return this._label;
    }


}
