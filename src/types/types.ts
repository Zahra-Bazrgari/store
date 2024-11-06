export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}


export interface ItemCardProps {
  title: string;
  price: number;
  rating: number;
  id: number;
  stock: number
  description: string;
  images: string[];
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  stock: number;
  images: string[];
  quantity: number;
}
