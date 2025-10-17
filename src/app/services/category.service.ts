import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../models/employee.model';
import { CategoryResponse } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/api/categories';

  http = inject(HttpClient);

  getAllCategories(): Observable<ApiResponse<CategoryResponse[]>> {
    return this.http.get<ApiResponse<CategoryResponse[]>>(this.apiUrl);
  }
}
