class BaseBuilder{
    static build(data_array=[{}]){
        throw new Error('Must be implemented')
    }
}

class FeriadoBuilder extends BaseBuilder{
    static build(data_array){
        return data_array.dates.map(value => new Feriado(value.label, value.day, value.month, 1));
    }
}

