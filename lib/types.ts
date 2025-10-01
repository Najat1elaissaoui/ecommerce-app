// Type definitions for the e-commerce app

export interface Product {
  id: number;
  name_ar: string;
  price: number;
  quantity: number;
  description_ar?: string;
  images?: string[];
  low_stock_threshold: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  productColor: string;
}

export interface Pack {
  id: number;
  name_ar: string;
  description_ar?: string;
  pack_price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  products?: PackProduct[];
}

export interface PackProduct {
  id: number;
  pack_id: number;
  product_id: number;
  quantity: number;
  product?: Product;
}

export interface Order {
  id: number;
  client_name: string;
  client_phone: string;
  client_city: string;
  comment?: string;
  total_amount: number;
  status: "en_attente" | "validee" | "annulee" | "expediee";
  admin_note?: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id?: number;
  pack_id?: number;
  quantity: number;
  unit_price: number;
  item_name_ar: string;
  product?: Product;
  pack?: Pack;
}

export interface Admin {
  id: number;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: number;
  name_ar: string;
  price: number;
  quantity: number;
  type: "product" | "pack";
  image?: string;
}

export interface DashboardStats {
  totalProducts: number;
  lowStockProducts: number;
  totalOrdersThisMonth: number;
  pendingOrders: number;
  totalRevenue: number;
}

export type DashboardStatsType = DashboardStats;
