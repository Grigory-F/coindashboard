
import { httpInstance } from "@/api/httpInstanse";
import { AssetsModel } from "../models/AssetsModel";
import { getListAssets } from "./AdapterServiceMappers";
import { ResponseModel } from "../models/ResponseModel";
import axios, { AxiosError } from "axios";

export class AdapterService {
    private readonly api = httpInstance;

    /**
     * * Получить все записи
     * @param projectId ID проекта
     * @returns
     */
    getAll() {
        return new Promise<ResponseModel<Array<AssetsModel>>>(async (resolve) => {
            const result = new ResponseModel<Array<AssetsModel>>();
            await this.api.get('/v2/assets')
                .then((resp) => {
                    result.Value = getListAssets(resp.data.data);
                    console.log(result.Value);
                    return resolve(result);
                })
                .catch((error: Error | AxiosError) => {
                    if (axios.isAxiosError(error)) {
                        result.ErrorCode = error?.code;
                        result.ErrorMessage = error?.message;
                    } else {
                        result.ErrorCode = 400;
                        result.ErrorMessage = error?.message;
                    }
                    result.IsSuccess = false;
                    console.error("ERROR getAll", error);
                    return resolve(result);
                });
        });
    }
}
