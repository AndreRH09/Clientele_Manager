package tech.getArray.employeemanager.exception;

public class UsernotFoundException extends RuntimeException{
    public UsernotFoundException(String message) {
        super(message);
    }
}
