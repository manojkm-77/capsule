export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  color: string;
  images: string[];
  badge?: string;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  colors?: string[];
  description?: string;
  material?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  images: string[];
  color?: string;
}

export interface Order {
  id: string;
  customer: string;
  handle: string;
  product: string;
  amount: number;
  status: string;
  date: string;
}

export interface Drop {
  id: string;
  number: number;
  title: string;
  description: string;
  status: string;
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  handle: string;
  text: string;
  rating: number;
  location: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
