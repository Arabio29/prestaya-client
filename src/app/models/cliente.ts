export interface Cliente {
    id:        number;
    cedula:    number;
    nombre:    string;
    celular:   number;
    direccion: string;
    prestamos: any[];
}
