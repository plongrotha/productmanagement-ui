export interface EmployeeDTO {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  isSuccess: boolean;
  payload: T;
  timestamp: string;
}

export interface EmployeeResponse {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dob: string;
  age: number;
}

export interface EmployeeUpdateDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
}
