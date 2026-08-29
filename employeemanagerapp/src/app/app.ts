//employeemanagerapp\src\app\app.ts
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee';
import { EmployeeService } from './employee-service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'


})
export class App implements OnInit {


  public title = 'employeemanagerapp';
  public employees = signal<Employee[]>([]);
  public editEmployee = signal<Employee | null>(null);
  public deleteEmployee = signal<Employee | null>(null);




  ngOnInit(): void {
    this.getEmployees();
  }

  constructor(private employeeService: EmployeeService) { }
  public getEmployees(): void {
    this.employeeService.getAllEmployee().subscribe({
      next: (response: Employee[]) => {
        this.employees.set(response);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onSearch(key: String): void{
    const results: Employee[]= [];
    for (const employee of this.employees()){
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1){
          results.push(employee);
        }

      }
    this.employees.set(results);
    if (results.length === 0 || !key){
      this.getEmployees();
    }
  }
  public onAddEmployee(addForm: NgForm): void {
    this.employeeService.addEmployee(addForm.value).subscribe({
      next: (response: Employee) => {
        console.log(response);
        this.employees.set([...(this.employees() || []), response]);
        document.getElementById('cancelAddEmployeeBtn')?.click();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
  public onEditEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe({
      next: (response: Employee) => {
        console.log(response);
        this.employees.set(this.employees()?.map(emp =>
          emp.id === response.id ? response : emp
        ) || []);
        console.log('Empleado actualizado: Y tambien paso el this');
        document.getElementById('cancelEditEmployeeBtn')?.click();

      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: (response: Employee) => {
        console.log(response);
        this.employees.set(this.employees()?.filter(emp => emp.id !== employeeId));
        document.getElementById('cancelDeleteEmployeeBtn')?.click();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
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
      this.editEmployee.set(employee);
      button.setAttribute('data-bs-target', '#editEmployeeModal');
    }
    else if (mode === 'delete') {
      this.deleteEmployee.set(employee);
      button.setAttribute('data-bs-target', '#deleteEmployeeModal');
    }

    container?.appendChild(button);
    button.click();
  }
}
