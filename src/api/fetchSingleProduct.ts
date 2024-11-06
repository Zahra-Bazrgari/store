import axiosInstance from './axiosInstance';

const fetchSingleProduct = async (productId: string) => {
  const { data } = await axiosInstance.get(`/products/${productId}`);
  return data;
};

export default fetchSingleProduct;
