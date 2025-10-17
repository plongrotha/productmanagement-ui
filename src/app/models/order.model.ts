export interface OrderRequest {
  orderItems: OrderItemRequest[];
}

export interface OrderResponse {
  orderId: number;
  totalAmount: number;
  orderItems: OrderItemResponse[];
  orderDate: string;
  createAt: string;
}

export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface OrderItemResponse {
  orderItemId: number;
  productId: number;
  productName: string;
  imageUrl: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
}

export interface CartItem {
  orderItemId: number;
  productId: number;
  productName: string;
  imageUrl: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
}
