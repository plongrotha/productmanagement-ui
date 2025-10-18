import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CategoryResponse,
  Product,
  ProductDto,
  ProductResponse,
  ProductUpdateDto,
} from '../models/product.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  // base url from spring boot backend
  private apiUrl =
    'http://productmangementapi-production.up.railway.app/api/v1/products';
  private cateapiUrl =
    'http://productmangementapi-production.up.railway.app/api/categories';

  http = inject(HttpClient);

  constructor() {}

  // get all the product
  getAllProducts(): Observable<ApiResponse<ProductResponse[]>> {
    return this.http.get<ApiResponse<ProductResponse[]>>(this.apiUrl);
  }

  // delete product by id
  deleteProductById(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }

  // create new product
  createProduct(
    productRequest: ProductDto
  ): Observable<ApiResponse<ProductResponse>> {
    return this.http.post<ApiResponse<ProductResponse>>(
      this.apiUrl,
      productRequest
    );
  }

  // get all categories
  getAllCategories(): Observable<ApiResponse<CategoryResponse[]>> {
    return this.http.get<ApiResponse<CategoryResponse[]>>(this.cateapiUrl);
  }

  // update by id
  updatePrudctById(
    productId: number,
    productUpdate: ProductUpdateDto
  ): Observable<ApiResponse<ProductResponse>> {
    return this.http.put<ApiResponse<ProductResponse>>(
      `${this.apiUrl}/${productId}`,
      productUpdate
    );
  }

  getAllProductNotHaveInStock(): Observable<ApiResponse<ProductResponse[]>> {
    return this.http.get<ApiResponse<ProductResponse[]>>(
      `${this.apiUrl}/notInStock`
    );
  }

  getProductById(productId: number): Observable<ApiResponse<ProductResponse>> {
    return this.http.get<ApiResponse<ProductResponse>>(
      `${this.apiUrl}/iproductId`
    );
  }
}
