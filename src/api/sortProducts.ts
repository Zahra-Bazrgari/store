import axiosInstance from './axiosInstance';

export const fetchProductsByCategory = async (slug: string) => {
  try {
    const response = await axiosInstance.get(`/products/category/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};