package pl.project.handmadezone.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.project.handmadezone.api.services.UserService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/Users")
public class UserController {
    private final UserService userService;

    @PutMapping("/add-cash")
    public ResponseEntity<String> addCash(
            @RequestParam Long id,
            @RequestParam Double cash) {
        userService.addCash(id, cash);
        return ResponseEntity.ok("Cash successfully added!");
    }
}
