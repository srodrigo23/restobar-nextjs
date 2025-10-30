export interface IWings{
  id:string,
  label:string
}

export interface IOrderItem {
  id: string;
  productType: 'alitas' | 'cerveza' | 'soda' | 'juice' | 'drinks';
  description: string;
  quantity: number;
  price: number;
  details?: {
    size?: string;
    sauces?: string[];
  };
} 