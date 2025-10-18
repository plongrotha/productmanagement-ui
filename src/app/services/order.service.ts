import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/employee.model';
import { OrderRequest, OrderResponse } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private API_URL =
    'https://productmangementapi-production.up.railway.app/v1/orders';

  http = inject(HttpClient);

  constructor() {}

  createOrder(
    orderRequest: OrderRequest
  ): Observable<ApiResponse<OrderResponse>> {
    return this.http.post<ApiResponse<OrderResponse>>(
      this.API_URL,
      orderRequest
    );
  }
}
