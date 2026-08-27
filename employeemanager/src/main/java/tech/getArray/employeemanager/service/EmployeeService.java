package tech.getArray.employeemanager.service;

import org.springframework.stereotype.Service;
import tech.getArray.employeemanager.exception.UserNotFoundException;
import tech.getArray.employeemanager.model.Employee;
import tech.getArray.employeemanager.repo.EmployeeRepo;

import java.util.List;
import java.util.UUID;

@Service
public class EmployeeService {
    private final EmployeeRepo employeeRepo;

    public EmployeeService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    public Employee addEmployee(Employee employee) {
        employee.setEmployeeCode(UUID.randomUUID().toString());
        return employeeRepo.save(employee);
    }

    public List<Employee> getAllEmployees() {
        return employeeRepo.findAll();
    }

    public Employee updateEmployee(Employee employee) {

        Employee existingEmployee = employeeRepo.findEmployeeById(employee.getId())
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "User by Id " + employee.getId() + " not found"
                        )
                );

        existingEmployee.setName(employee.getName());
        existingEmployee.setEmail(employee.getEmail());
        existingEmployee.setPhone(employee.getPhone());
        existingEmployee.setJobTitle(employee.getJobTitle());
        existingEmployee.setImgUrl(employee.getImgUrl());

        return employeeRepo.save(existingEmployee);
    }

    public Employee findEmployeebyId(Long id) {
        return employeeRepo.findEmployeeById(id)
                .orElseThrow(()-> new UserNotFoundException("user by Id "+ id +" not found"));
    }

    public void deleteEmployee(Long id) {
        employeeRepo.deleteEmployeeById(id);
    }

}
