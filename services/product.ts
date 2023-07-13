import { formatUrl } from "@/utils";
import http from "./http";

export const getProductList = async (parameters = {}, requestOptions = {}) => {
    const url = formatUrl('/products', parameters)

    const response = await http.get(url, requestOptions)
    return response?.data
}