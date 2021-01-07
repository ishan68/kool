export interface Order {
	id?: number
	final_amount?: number
  user?: string;
  line_items: OrderItem[];
  remarks?: string;
  delivery_date: Date;
  delivery_address?: Address;
  billing_address?: Address;
}

export interface OrderItem {
  item_id: number;
  quantity: number;
  amount: number;
  servings: string;
  shape: string;
  filling: string;
  status?: string;
  dietary_requirements: string;
  type: string;
  sponge: string;
  message?: string;
}

export interface Address {
  name: string;
  phone: string;
  address1?: string;
  address2?: string;
  city?: string;
  pincode?: string;
  country?: string;
}
