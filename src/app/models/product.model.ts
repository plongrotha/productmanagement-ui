export interface Product {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  inStock: boolean;
  category: string;
  imageUrl: string;
  categoryName: string;
}

export interface ProductResponse {
  id: number;
  productName: string;
  quantity: number;
  imageUrl: string;
  price: number;
  categoryId: number;
  description?: string;
}

export interface ProductUpdateDto {
  productName: string;
  description?: string;
  price: number;
  categoryId: number;
  imageUrl: string;
  quantity: number;
}

export interface ProductDto {
  productName: string;
  quantity: number;
  imageUrl: string;
  price: number;
  description?: string;
  categoryId: number;
}

export interface CategoryResponse {
  category_id: number;
  category_name: string;
}

export class Logger {
  log(msg: unknown) {
    console.log(msg);
  }
  error(msg: unknown) {
    console.error(msg);
  }
  warn(msg: unknown) {
    console.warn(msg);
  }
}
