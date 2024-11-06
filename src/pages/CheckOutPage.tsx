import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const checkoutSchema = z.object({
  firstName: z.string().min(1, 'Required').regex(/^[A-Z]/, 'Must start with a capital letter'),
  lastName: z.string().min(1, 'Required').regex(/^[A-Z]/, 'Must start with a capital letter'),
  email: z.string().email('Invalid email format'),
  cardNumber: z.string().regex(/^6037/, 'Card number must start with 6037').length(16, 'Card number must be 16 digits'),
  phoneNumber: z.string().regex(/^\+989\d{9}$/, 'Phone number must start with +989 and be 12 characters'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  homeNumber: z.string().regex(/^021\d{8}$/, 'Home number must start with 021 and be 11 characters'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData | null>(null);

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const onSubmit = (data: CheckoutFormData) => {
    setIsSubmitted(true);
    setFormData(data);
  };

  const totalCost = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        {['firstName', 'lastName', 'email', 'cardNumber', 'phoneNumber', 'address', 'homeNumber'].map((field) => (
          <div key={field}>
            <label>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</label>
            <input {...register(field as keyof CheckoutFormData)} className="border p-2 w-full" />
            {errors[field as keyof CheckoutFormData] && (
              <p className="text-red-500">{errors[field as keyof CheckoutFormData]?.message}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className={`p-2 w-full mt-4 ${isValid ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          disabled={!isValid}
        >
          Submit
        </button>
      </form>

      {isSubmitted && formData && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <h3 className="mt-4 mb-2 font-semibold">Items in Cart:</h3>
            <ul className="list-disc pl-6 space-y-2">
              {cartItems.map(item => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.title} - Quantity: {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-right font-semibold">
              <p>Total Cost: ${totalCost.toFixed(2)}</p>
            </div>
            <p className="mt-4 text-green-600">Form successfully submitted!</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
