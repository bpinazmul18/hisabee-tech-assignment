import http from "./http";
import { formatUrl } from "@/utils";

export const getCategoryList = async (parameters = {}, requestOptions = {}) => {
    const url = formatUrl('/products/categories', parameters)

    const response = await http.get(url, requestOptions)
    return response?.data
}