package pl.project.handmadezone.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.project.handmadezone.api.model.Users;
import pl.project.handmadezone.api.service.users.UsersService;

import java.util.List;
import java.util.Map;

@RestController
public class UsersController {

    @Autowired
    private UsersService service;

    @GetMapping("/handmadezone/api")
    public List<Users> find(){
        return service.find();
    }

    @PostMapping("/handmadezone/api")
    @ResponseStatus(HttpStatus.CREATED)
    public Users create(@RequestBody Users users){
        return service.create(users);
    }

    @PutMapping("/handmadezone/api/{id}")
    public Users update(@PathVariable Long id, @RequestBody Map<String, Object> payload){
        return service.update(id, (String) payload.get("name"));
    }

    @DeleteMapping("/handmadezone/api/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id){
        service.delete(id);
    }
}
