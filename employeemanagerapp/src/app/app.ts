import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee';
import { EmployeeService } from './employee-service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'


})
export class App implements OnInit {


  public title = 'employeemanagerapp';
  public employees: Employee[] | undefined;



  ngOnInit(): void {
    this.getEmployees();
  }

  constructor(private employeeService: EmployeeService) { }

  public getEmployees(): void {
    this.employeeService.getAllEmployee().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addEmployeeModal');
    }
    else if (mode === 'edit') {
      button.setAttribute('data-bs-target', '#editEmployeeModal');
    }
    else if (mode === 'delete') {
      button.setAttribute('data-bs-target', '#deleteEmployeeModal');
    } 

    container?.appendChild(button);
    button.click();
  }
}
