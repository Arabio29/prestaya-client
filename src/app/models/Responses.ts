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
}
