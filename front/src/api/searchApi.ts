import axios, {AxiosResponse} from 'axios';
import {ProductType} from "../types/ProductType";

export const searchProduct = async (find: string) => {
  try {
    const response: AxiosResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/search?find=${find}`);
    const responseData: ProductType[] = response.data;
    return responseData;
  } catch (error) {
    console.log(error);
  }
};