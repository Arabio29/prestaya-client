export interface RespData<T> {
    status: string;
    data: T;
    error?: any;
}