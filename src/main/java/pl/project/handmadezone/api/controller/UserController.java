package pl.project.handmadezone.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.project.handmadezone.api.model.User;
import pl.project.handmadezone.api.service.users.UsersService;

import java.util.List;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private UsersService service;

    @GetMapping("/handmadezone/api")
    public List<User> find(){
        return service.findUser();
    }

    @PostMapping("/handmadezone/api")
    @ResponseStatus(HttpStatus.CREATED)
    public User create(@RequestBody User users){
        return service.createUser(users);
    }

    @PutMapping("/handmadezone/api/{id}")
    public User update(@PathVariable Long id, @RequestBody Map<String, Object> payload){
        return service.updateUser(id, (String) payload.get("name"));
    }

    @DeleteMapping("/handmadezone/api/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id){
        service.deleteUser(id);
    }
}
