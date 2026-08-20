package tech.getArray.employeemanager.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.getArray.employeemanager.model.Employee;

import java.util.Optional;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {
    void deleteEmployeebyID(Long id);

    Optional<Employee> findEmployeebyID(Long id);
}
