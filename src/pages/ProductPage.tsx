import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useProduct from '../hooks/useProduct';
import Loading from '../components/home/Loading';
import { addToCart, removeItem, increaseQuantity, decreaseQuantity } from '../redux/cartSlice';
import { RootState } from '../redux/store';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id!);
  const dispatch = useDispatch();

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === Number(id))
  );
  
  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          stock: product.stock,
          images: product.images,
          quantity: 1,
        })
      );
    }
  };

  const handleRemoveFromCart = () => {
    if (cartItem) {
      dispatch(removeItem(cartItem.id));
    }
  };

  const handleIncrease = () => {
    if (cartItem && cartItem.quantity < product.stock) {
      dispatch(increaseQuantity(cartItem.id));
    }
  };

  const handleDecrease = () => {
    if (cartItem && cartItem.quantity > 1) {
      dispatch(decreaseQuantity(cartItem.id));
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading product</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <img
          src={product.images[0]}
          alt={product.title}
          className=" md:w-1/2 max-h-screen object-cover rounded"
        />
        <div className="flex-1 items-center justify-center h-full">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-lg font-bold mb-2">${product.price}</p>
          <p className="text-sm text-yellow-500 mb-2">Rating: {product.rating}⭐</p>
          <p className="mb-4">
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>

          {product.stock > 0 && (
            <div className="flex items-center space-x-4">
              {cartItem ? (
                <>
                  <button
                    onClick={handleDecrease}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span>{cartItem.quantity}</span>
                  <button
                    onClick={handleIncrease}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                  <button
                    onClick={handleRemoveFromCart}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove from Cart
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
