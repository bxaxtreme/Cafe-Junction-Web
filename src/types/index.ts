export type MenuCategory = 'all' | 'chais' | 'cold' | 'bites' | 'pizza_burger';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  categoryLabel: string;
  price: number;
  description: string;
  isVegetarian: boolean;
  isBestseller?: boolean;
  image: string;
  prepTime?: string;
  tags?: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export interface Review {
  id: string;
  author: string;
  city?: string;
  rating: number;
  text: string;
  date: string;
  favoriteItem?: string;
}

export type OrderType = 'dine_in' | 'takeaway' | 'delivery';

export interface OrderDetails {
  id: string;
  customerName: string;
  phone: string;
  orderType: OrderType;
  tableNumber?: string;
  address?: string;
  notes?: string;
  paymentMethod: 'cash' | 'upi' | 'card';
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  timestamp: string;
}
