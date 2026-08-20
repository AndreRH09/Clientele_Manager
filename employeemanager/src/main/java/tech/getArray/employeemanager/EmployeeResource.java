package tech.getArray.employeemanager;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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

    @RequestMapping
    public ResponseEntity<List<Employee>> getAllEmployees(){
        List<Employee> employees = employeeService.getAllEmployees();
        return new ResponseEntity<>(employees,HttpStatus.OK);
    }

    @RequestMapping("/find/{id}")
    public ResponseEntity<List<Employee>> getEmployeeById(@PathVariable Long id){
        List<Employee> employees = employeeService.findEmployeebyId(id);
        return new ResponseEntity<>(employees,HttpStatus.OK);
    }
}
