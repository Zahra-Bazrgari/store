import axiosInstance from './axiosInstance';
import { ProductsResponse } from '../types/types';


const fetchProducts = async ({ pageParam = 0 }): Promise<ProductsResponse> => {
  const response = await axiosInstance.get('/products', {
    params: { skip: pageParam, limit: 10 },
  });

  return response.data;
};

export default fetchProducts;
