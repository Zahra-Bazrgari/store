import React from 'react';
import { Link } from 'react-router-dom';
import useInfiniteProducts from '../hooks/useInfiniteProducts';
import Loading from '../components/home/Loading';
import ItemCard from '../components/home/ItemCard';

const categories = [
  { slug: "beauty", name: "Beauty" },
  { slug: "fragrances", name: "Fragrances" },
  { slug: "furniture", name: "Furniture" },
  { slug: "groceries", name: "Groceries" },
  { slug: "home-decoration", name: "Home Decoration" },
  { slug: "kitchen-accessories", name: "Kitchen Accessories" },
  { slug: "laptops", name: "Laptops" },
  { slug: "mens-shirts", name: "Mens Shirts" },
  { slug: "mens-shoes", name: "Mens Shoes" },
  { slug: "mens-watches", name: "Mens Watches" },
  { slug: "mobile-accessories", name: "Mobile Accessories" },
  { slug: "motorcycle", name: "Motorcycle" },
  { slug: "skin-care", name: "Skin Care" },
  { slug: "smartphones", name: "Smartphones" },
  { slug: "sports-accessories", name: "Sports Accessories" },
  { slug: "sunglasses", name: "Sunglasses" },
  { slug: "tablets", name: "Tablets" },
  { slug: "tops", name: "Tops" },
  { slug: "vehicle", name: "Vehicle" },
  { slug: "womens-bags", name: "Womens Bags" },
  { slug: "womens-dresses", name: "Womens Dresses" },
  { slug: "womens-jewellery", name: "Womens Jewellery" },
  { slug: "womens-shoes", name: "Womens Shoes" },
  { slug: "womens-watches", name: "Womens Watches" },
];

const Home: React.FC = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteProducts();

  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Product List</h1>

      <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hidden mb-4 text-nowrap">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/category/${category.slug}`}
            className="py-2 px-4 rounded bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            {category.name}
          </Link>
        ))}
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.pages.map((page) =>
            page.products.map((product) => (
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
            ))
          )}
        </div>
      )}

      <div className="flex justify-center mt-4">
        {isFetchingNextPage ? (
          <Loading />
        ) : (
          hasNextPage && (
            <button onClick={loadMore} className="px-4 py-2 bg-blue-500 text-white rounded">
              Load More
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
