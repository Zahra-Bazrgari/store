import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Loading from '../components/home/Loading';
import ItemCard from '../components/home/ItemCard';
import { fetchProductsByCategory } from '../api/sortProducts';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<string>();

  const { data, isLoading, isError, error } = useQuery(
    ['categoryProducts', slug],
    () => fetchProductsByCategory(slug),
    {
      enabled: !!slug,
    }
  );

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading products: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 capitalize">{slug} Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.products.map((product: any) => (
          <ItemCard
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            rating={product.rating}
            images={product.images}
            stock={product.stock}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
