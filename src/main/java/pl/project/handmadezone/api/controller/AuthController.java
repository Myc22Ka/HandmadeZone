package pl.project.handmadezone.api.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.project.handmadezone.api.dtos.CredentialsDto;
import pl.project.handmadezone.api.dtos.SignUpDto;
import pl.project.handmadezone.api.dtos.TokenDto;
import pl.project.handmadezone.api.dtos.UserDto;
import pl.project.handmadezone.api.exceptions.AppException;
import pl.project.handmadezone.api.services.UserService;
import pl.project.handmadezone.config.UserAuthenticationProvider;

import java.net.URI;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final UserService userService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @PostMapping("/sign-in")
    public ResponseEntity<UserDto> login(@RequestBody @Valid CredentialsDto credentialsDto) {
        UserDto userDto = userService.login(credentialsDto);
        userDto.setToken(userAuthenticationProvider.createToken(userDto.getLogin()));
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody @Valid SignUpDto user) {
        UserDto createdUser = userService.register(user);
        createdUser.setToken(userAuthenticationProvider.createToken(user.getLogin()));
        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
    }

    @PostMapping("/validate-token")
    public ResponseEntity<UserDto> validateToken(@RequestBody TokenDto tokenDto) {
        UserDto userDto = userService.validateToken(tokenDto.getToken());
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

}