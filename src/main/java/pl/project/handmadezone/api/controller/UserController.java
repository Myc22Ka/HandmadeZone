package pl.project.handmadezone.api.controller;

import org.springframework.web.bind.annotation.*;
import pl.project.handmadezone.api.model.User;
import pl.project.handmadezone.service.UserService;

import java.util.Optional;

@RestController
public class UserController {

    private UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/api/user")
    public User getUser(@RequestParam Long id){
        Optional user = userService.getUser(id);
        if(user.isPresent()){
            return (User) user.get();
        }
        return null;
    }
}
