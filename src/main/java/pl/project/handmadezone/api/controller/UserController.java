package pl.project.handmadezone.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pl.project.handmadezone.api.model.User;
import pl.project.handmadezone.service.UserService;

import java.util.Optional;

@RestController
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/user")
    public User getUser(@RequestParam Long id) {
        Optional<User> user = userService.getUser(id);
        return user
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }
}