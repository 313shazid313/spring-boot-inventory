package com.hasan.springpostgrescrud.exeption;

public class DuplicateResourceException extends RuntimeException {
    public DuplicateResourceException(String message) {
        super(message);
    }
    
}
