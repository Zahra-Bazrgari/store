import { useInfiniteQuery } from '@tanstack/react-query';
import fetchProducts from '../api/fetchProducts';

const useInfiniteProducts = () => {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length * lastPage.limit;
      return nextPage < lastPage.total ? nextPage : undefined;
    },
  });
};

export default useInfiniteProducts;
