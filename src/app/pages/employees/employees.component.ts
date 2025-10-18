import { Component, inject, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../../services/employee-service.service';
import {
  EmployeeResponse,
  EmployeeUpdateDto,
} from '../../models/employee.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { EmployeeListComponent } from './employee-list/employee-list.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule, EmployeeListComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  users: EmployeeResponse[] = [];
  totalEmployees: number = 0;
  selectedEmployeeId: number = 0;
  isOpenDeleteModal: boolean = false;
  isDelete: boolean = false;

  isOpenModal: boolean = false;
  userObj: EmployeeResponse = {
    id: 0,
    fullName: '',
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    age: 0,
    phoneNumber: '',
  };

  employeeUpdateDto: EmployeeUpdateDto = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dob: '',
  };

  // injecttion
  userService = inject(EmployeeServiceService);
  constructor() {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  closeModal(): void {
    this.isOpenModal = false;
    this.selectedEmployeeId = 0;
    this.resetUpdateDto();
  }

  openModal(user: EmployeeResponse): void {
    this.selectedEmployeeId = user.id;
    this.employeeUpdateDto = { ...user };
    this.isOpenModal = true;
  }

  openDeleteModal(emp: EmployeeResponse) {
    this.selectedEmployeeId = emp.id;
    this.isDelete = true;
  }

  closeDeleteModal() {
    this.isDelete = false;
  }
  deleteEmpByid() {
    const deleteEmp = this.users.find((emp) => {
      emp.id = this.selectedEmployeeId;
    });

    this.userService.deleteUserById(this.selectedEmployeeId).subscribe({
      next: () => {
        this.users = this.users.filter((emp) => {
          emp.id != this.selectedEmployeeId;
        });
        this.getAllUsers();
        this.totalEmployees;
        this.isDelete = false;
      },
      error: () => {},
    });
  }
  resetUpdateDto(): void {
    this.employeeUpdateDto = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dob: '',
    };
  }
  updateUser(): void {
    if (this.selectedEmployeeId === 0) {
      return;
    }
    this.userService
      .updateUserById(this.selectedEmployeeId, this.employeeUpdateDto)
      .subscribe({
        next: () => {
          const index = this.users.findIndex(
            (user) => user.id === this.selectedEmployeeId
          );
          if (index !== -1) {
            this.users[index] = {
              ...this.users[index],
              ...this.employeeUpdateDto,
            };
            this.users[index].fullName =
              this.users[index].firstName + ' ' + this.users[index].lastName;
          }
          this.getAllUsers();
          this.closeModal();
        },
        error: (err) => {
          console.error('Update failed', err);
        },
      });
  }

  // get all employee
  getAllUsers(): void {
    this.userService
      .getAllEmployees()
      .pipe(map((res) => res.payload))
      .subscribe((user) => {
        this.users = user;
        this.totalEmployees = this.users.length;
        localStorage.setItem('users', JSON.stringify(this.users));
      });
  }

  // delete user by id
  // deleteUser(id: number): void {
  //   const deleteUser = this.users.find((user) => user.id === id);
  //   const firstName = deleteUser ? deleteUser.firstName : 'this user';
  //   if (!confirm('are you want to delete User : ' + id)) {
  //     return;
  //   }

  //   this.userService.deleteUserById(id).subscribe({
  //     next: () => {
  //       this.users = this.users.filter((user) => user.id != id);
  //       this.totalEmployees = this.users.length;
  //     },
  //     error: (err) => {
  //       console.error('Delete failed', err);
  //     },
  //   });
  // }

  // create an employee
  addUser(): void {
    this.userService.createUser(this.userObj).subscribe({
      next: (res) => {
        const newUser = res.payload;
        newUser.fullName = newUser.firstName + ' ' + newUser.lastName;
        this.getAllUsers();
        this.totalEmployees = this.users.length;

        // reset form
        this.userObj.id = 0;
        this.userObj.fullName = '';
        this.userObj.firstName = '';
        this.userObj.lastName = '';
        this.userObj.dob = '';
        this.userObj.email = '';
        this.userObj.phoneNumber = '';
      },
      error: (err) => {
        console.error('failed create user : ', err);
      },
    });
  }

  getUserById(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: (res) => {
        console.log(res.isSuccess);
      },
      error: (err) => {
        console.error('failed to get user : ', err);
      },
    });
  }
}
