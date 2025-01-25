package pl.project.handmadezone.api.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.project.handmadezone.api.exceptions.GlobalException;
import pl.project.handmadezone.api.services.UserService;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/Users")
public class UserController {
    private final UserService userService;

    @PutMapping("/add-cash")
    public ResponseEntity<GlobalException.ErrorResponse> addCash(
            @RequestParam Long id,
            @RequestParam Double cash,
            HttpServletRequest request) {
        userService.addCash(id, cash);

        GlobalException.ErrorResponse successResponse = new GlobalException.ErrorResponse(
                LocalDateTime.now().toString(),
                HttpStatus.OK.getReasonPhrase(),
                request.getRequestURI(),
                "Cash successfully added!",
                HttpStatus.OK.value()
        );

        return ResponseEntity.ok(successResponse);
    }
}
