import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeResponse } from '../../../models/employee.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  imports: [NgFor, NgIf],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent {
  @Input() employees: EmployeeResponse[] = [];

  @Output() editEmployee = new EventEmitter<EmployeeResponse>();
  @Output() deleteEmployee = new EventEmitter<EmployeeResponse>();

  onEdit(employee: EmployeeResponse) {
    this.editEmployee.emit(employee);
  }
  onDelete(employee: EmployeeResponse) {
    this.deleteEmployee.emit(employee);
  }
}
