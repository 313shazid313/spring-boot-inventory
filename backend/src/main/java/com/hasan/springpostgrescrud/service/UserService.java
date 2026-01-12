package com.hasan.springpostgrescrud.service;

import com.hasan.springpostgrescrud.entity.User;
import com.hasan.springpostgrescrud.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register
    public User register(User user) {
        return userRepository.save(user);
    }

    // Login
    public User login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Wrong password");
        }

        return user;
    }
}
