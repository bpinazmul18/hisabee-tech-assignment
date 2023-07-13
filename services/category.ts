import { formatUrl } from "@/utils";
import http from "./http";

export const getCategoryList = async (parameters = {}, requestOptions = {}) => {
    const url = formatUrl('/products/categories', parameters)

    const response = await http.get(url, requestOptions)
    return response?.data
}