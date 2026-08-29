//C:\Users\andre\OneDrive\Escritorio\Portafolio\Angular\Clientele_Manager\employeemanager\src\main\java\tech\getArray\employeemanager\EmployeeResource.java
package tech.getArray.employeemanager;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.getArray.employeemanager.model.Employee;
import tech.getArray.employeemanager.service.EmployeeService;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeResource {
    private final EmployeeService employeeService;

    public EmployeeResource(EmployeeService employeeService) {

        this.employeeService = employeeService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllEmployees(){
        List<Employee> employees = employeeService.getAllEmployees();
        return new ResponseEntity<>(employees,HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Employee> getEmployeebyId(@PathVariable("id") Long id){
        Employee employee = employeeService.findEmployeebyId(id);
        return new ResponseEntity<>(employee,HttpStatus.OK);
    }


    @PostMapping("/add")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee){
        Employee newEmployee = employeeService.addEmployee(employee);
        return new ResponseEntity<>(newEmployee,HttpStatus.CREATED);
    }


    @PutMapping("/update")
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee){
        Employee updateEmployee = employeeService.updateEmployee(employee);
        return new ResponseEntity<>(updateEmployee,HttpStatus.ACCEPTED);
    }

    @PutMapping("/updateEmployee/{id}")
    public ResponseEntity<Employee> updateEmployeebyId(@PathVariable Long id,
            @RequestBody Employee employee) {

        employee.setId(id);

        Employee updatedEmployee = employeeService.updateEmployee(employee);

        return new ResponseEntity<>(updatedEmployee, HttpStatus.ACCEPTED);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("id") Long id){
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
