package com.hasan.springpostgrescrud.controller;

import com.hasan.springpostgrescrud.entity.User;
import com.hasan.springpostgrescrud.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // Register
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    // Login
    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userService.login(user.getUsername(), user.getPassword());
    }

    // Logout
    @PostMapping("/logout")
    public String logout() {
        return "Logged out successfully";
    }
}
