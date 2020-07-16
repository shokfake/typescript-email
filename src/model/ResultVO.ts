export default interface ResultV0<T> {
    errorCode: number;
    errorMsg: string;
    data: T;
}