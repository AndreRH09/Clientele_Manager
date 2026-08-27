import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee';
import { EmployeeService } from './employee-service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
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

}
