export interface Items {
  title: string;
  id: string;
  unit_price: number;
  quantity: number;
  picture_url: string;
  category_id: string;
}

export interface Payments {
  date_created: string;
  id: string;
  items: Items[];
  status: string;
  status_detail: string;
  total_paid_amount: number;
}
