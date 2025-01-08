package pl.project.handmadezone.api.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.project.handmadezone.api.dtos.CredentialsDto;
import pl.project.handmadezone.api.dtos.SignUpDto;
import pl.project.handmadezone.api.dtos.TokenDto;
import pl.project.handmadezone.api.dtos.UserDto;
import pl.project.handmadezone.api.services.UserService;
import pl.project.handmadezone.config.UserAuthenticationProvider;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final UserService userService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    /**
     * Handles user login by validating credentials and returning user data with a token.
     *
     * @param credentialsDto The credentials containing username and password.
     * @return ResponseEntity containing the user data and generated token.
     */
    @PostMapping("/sign-in")
    public ResponseEntity<UserDto> login(@RequestBody @Valid CredentialsDto credentialsDto) {
        UserDto userDto = userService.login(credentialsDto);
        userDto.setToken(userAuthenticationProvider.createToken(userDto.getLogin()));
        return ResponseEntity.ok(userDto);
    }

    /**
     * Handles user registration by creating a new user and returning the created user data with a token.
     *
     * @param user The user registration data.
     * @return ResponseEntity containing the newly created user data and generated token.
     */
    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody @Valid SignUpDto user) {
        UserDto createdUser = userService.register(user);
        createdUser.setToken(userAuthenticationProvider.createToken(user.getLogin()));
        return ResponseEntity.ok(createdUser);
    }

    /**
     * Validates a user's token and returns the associated user data.
     *
     * @param tokenDto The DTO containing the token to validate.
     * @return ResponseEntity containing the user data associated with the valid token.
     */
    @PostMapping("/validate-token")
    public ResponseEntity<UserDto> validateToken(@RequestBody TokenDto tokenDto) {
        UserDto userDto = userService.validateToken(tokenDto.getToken());
        return ResponseEntity.ok(userDto);
    }
}