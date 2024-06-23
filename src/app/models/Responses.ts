export interface RespData<T> {
    status: string;
    data: T;
    error?: any;
}

export interface Prestamos {
    id:              number;
    monto:           number;
    modalidad:       string;
    cuotas:          number;
    tasaInteres:     number;
    cuotaPagar:      number;
    totalPagar:      number;
    fechaInicio:     Date;
    interesGenerado: number;
    estado:          string;
}
export interface Cliente {
    id:        number;
    cedula:    number;
    nombre:    string;
    celular:   number;
    direccion: string;
    prestamos: any[];
}
