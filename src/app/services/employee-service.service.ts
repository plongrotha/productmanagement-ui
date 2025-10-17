import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ApiResponse,
  EmployeeDTO,
  EmployeeResponse,
  EmployeeUpdateDto,
} from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceService {
  // the base Url from the spring boot api
  private apiUrl = 'http://localhost:8080/api/employees';

  http = inject(HttpClient);

  createUser(UserDto: EmployeeDTO): Observable<ApiResponse<EmployeeResponse>> {
    return this.http.post<ApiResponse<EmployeeResponse>>(this.apiUrl, UserDto);
  }

  getAllEmployees(): Observable<ApiResponse<EmployeeResponse[]>> {
    return this.http.get<ApiResponse<EmployeeResponse[]>>(this.apiUrl);
  }

  deleteUserById(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }

  getUserById(id: number): Observable<ApiResponse<EmployeeResponse>> {
    return this.http.get<ApiResponse<EmployeeResponse>>(`${this.apiUrl}/${id}`);
  }

  updateUserById(
    id: number,
    userUpdateDto: EmployeeUpdateDto
  ): Observable<ApiResponse<EmployeeResponse>> {
    return this.http.put<ApiResponse<EmployeeResponse>>(
      `${this.apiUrl}/${id}`,
      userUpdateDto
    );
  }
}
