//C:\Users\andre\OneDrive\Escritorio\Portafolio\Angular\Clientele_Manager\employeemanager\src\main\java\tech\getArray\employeemanager\repo\EmployeeRepo.java
package tech.getArray.employeemanager.repo;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import tech.getArray.employeemanager.model.Employee;

import java.util.Optional;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {
    @Transactional // <-- Permite que la modificación se ejecute en un contexto transaccional
    @Modifying
    void deleteEmployeeById(Long id);

    Optional<Employee> findEmployeeById(Long id);
}
