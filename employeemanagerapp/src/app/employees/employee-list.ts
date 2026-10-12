import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../employee';
import { EmployeeService } from '../employee-service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit {
  private employeeService = inject(EmployeeService);

  public errorMessage = signal<string | null>(null);
  public employees = signal<Employee[]>([]);
  private allEmployees: Employee[] = []; // Backup para restaurar búsquedas vacías
  
  public editEmployee = signal<Employee | null>(null);
  public deleteEmployee = signal<Employee | null>(null);

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getAllEmployee().subscribe({
      next: (response: Employee[]) => {
        this.errorMessage.set(null);
        this.employees.set(response);
        this.allEmployees = response; // Guardamos la lista maestra
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage.set('No se pudo cargar la lista: ' + error.message);
      }
    });
  }

  public onSearch(key: string): void {
    if (!key || key.trim() === '') {
      this.employees.set(this.allEmployees);
      return;
    }
    
    const searchTerm = key.toLowerCase();
    const results = this.allEmployees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm) ||
      employee.email.toLowerCase().includes(searchTerm) ||
      employee.jobTitle.toLowerCase().includes(searchTerm)
    );
    
    this.employees.set(results);
  }

  // Métodos simplificados para guardar el estado antes de que Bootstrap abra el modal
  public selectEditEmployee(employee: Employee): void {
    this.editEmployee.set(employee);
  }

  public selectDeleteEmployee(employee: Employee): void {
    this.deleteEmployee.set(employee);
  }

  public onAddEmployee(addForm: NgForm): void {
    this.employeeService.addEmployee(addForm.value).subscribe({
      next: (response: Employee) => {
        this.employees.set([...this.employees(), response]);
        this.allEmployees = [...this.allEmployees, response];
        
        // Cierre seguro simulando click del botón nativo del modal de Bootstrap
        document.getElementById('cancelAddEmployeeBtn')?.click();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => this.errorMessage.set(error.message)
    });
  }

  public onEditEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe({
      next: (response: Employee) => {
        const updatedList = this.employees().map(emp => emp.id === response.id ? response : emp);
        this.employees.set(updatedList);
        this.allEmployees = this.allEmployees.map(emp => emp.id === response.id ? response : emp);
        
        document.getElementById('cancelEditEmployeeBtn')?.click();
      },
      error: (error: HttpErrorResponse) => this.errorMessage.set(error.message)
    });
  }

  public onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: () => {
        const filteredList = this.employees().filter(emp => emp.id !== employeeId);
        this.employees.set(filteredList);
        this.allEmployees = this.allEmployees.filter(emp => emp.id !== employeeId);
        
        document.getElementById('cancelDeleteEmployeeBtn')?.click();
      },
      error: (error: HttpErrorResponse) => this.errorMessage.set(error.message)
    });
  }
}
