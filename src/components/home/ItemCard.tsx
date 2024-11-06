import React, { useState, useEffect } from 'react';
import { ItemCardProps } from '../../types/types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { RootState } from '../../redux/store';

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  title,
  description,
  price,
  rating,
  stock,
  images,
}) => {
  const dispatch = useDispatch();
  
  const cartItem = useSelector((state: RootState) => 
    state.cart.items.find((item) => item.id === id)
  );

  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    setIsInCart(Boolean(cartItem));
  }, [cartItem]);

  const handleAddToCart = () => {
    dispatch(addToCart({ id, title, price, stock, images, quantity: 1 }));
    setIsInCart(true);
  };

  return (
    <div className='p-4 bg-white rounded shadow-md'>
      <Link to={`/${id}`}>
        <img src={images[0]} alt={title} className='w-full h-48 object-cover rounded' />
        <div className='p-2'>
          <h3 className='font-semibold text-lg overflow-hidden text-ellipsis' style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>{title}</h3>
          <p className='text-sm text-gray-600 overflow-hidden text-ellipsis' style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{description}</p>
          <div className='flex justify-between mt-2'>
            <span className='font-bold'>${price}</span>
            <span className='text-yellow-500'>{rating}⭐</span>
          </div>
        </div>
      </Link>

      {stock > 0 ? (
        isInCart ? (
          <button disabled className='mt-4 w-full px-4 py-2 bg-green-500 text-white rounded'>
            Product is in Cart
          </button>
        ) : (
          <button onClick={handleAddToCart} className='mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
            Add to Cart
          </button>
        )
      ) : (
        <p className='text-red-500 pt-4'>Out of stock</p>
      )}
    </div>
  );
};

export default ItemCard;
