import http from "./http";

interface Parameters {
  cat: string
}

export const getProductList = async (
  parameters: Parameters,
  requestOptions = {}
) => {
    let response
    
    if (!parameters.cat) response = await http.get(`/products`, requestOptions);
    else response = await http.get(`/products/category/${parameters.cat}`, requestOptions);

  return response?.data;
};

export const getProduct = async ({ id} : {id: string }) => {
  const response = await http.get(`/products/${id}`);

  return response?.data;
};
