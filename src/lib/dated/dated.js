class Dated {
    constructor(day, month, year) {
        this._day = day;
        this._month = month;
        this._year = year;
    }

    toString(){
        return `${this._day}/${this._month}/${this._year}`;
    }

    static get current(){
        const today = new Date();
        return new Dated(today.getDate(), today.getMonth(), today.getFullYear());
    }

    get year(){
        return this._year;
    }

    get month(){
        return this._month;
    }

    get day(){
        return this._day;
    }

    get date(){
        return new Date(this.year, this.month - 1, this.day, 0, 0, 0);

    }

    add(day=0, month=0, year=0){
        return new Dated(this._day + day, this._month + month, this._year + year);
    }

    subtract(day=0, month=0, year=0){
        return new Dated(this._day - day, this._month - month, this._year - year);
    }

    lessThan(dated=Dated.current.add(1)){
        if (this.year < dated.year) return true;
        if (this.month < dated.month) return true;
        if (this.day < dated.month) return true;
        return false;
    }

    greaterThan(dated=Dated.current.add(1)){
        if (this.year > dated.year) return true;
        if (this.month > dated.month) return true;
        if (this.day > dated.month) return true;
        return false;
    }

    equals(dated) {
        return  this.year === dated.year &&
                this.month === dated.month &&
                this.year === dated.year
    }
}

