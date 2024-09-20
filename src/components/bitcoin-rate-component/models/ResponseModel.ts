/**
 * * Модель описывающая ответ запроса
 */
export class ResponseModel<T = undefined> {
    /**Статус запроса */
    IsSuccess: boolean = true;
    /**Элементы */
    Value!: T;
    /**Ошибка */
    ErrorMessage?: string;
    /**Код ошибки */
    ErrorCode?: number | string;

    constructor(obj?: Partial<ResponseModel<T>>) {
        Object.assign(this, obj);
    }
}