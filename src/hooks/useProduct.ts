import { useQuery } from '@tanstack/react-query';
import fetchSingleProduct from '../api/fetchSingleProduct';

const useProduct = (productId: string) => {
  return useQuery(['product', productId], () => fetchSingleProduct(productId), {
    enabled: !!productId,
  });
};


export default useProduct;