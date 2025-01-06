package pl.project.handmadezone.api.services;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.project.handmadezone.api.dtos.CredentialsDto;
import pl.project.handmadezone.api.dtos.SignUpDto;
import pl.project.handmadezone.api.dtos.UserDto;
import pl.project.handmadezone.api.exceptions.AppException;
import pl.project.handmadezone.api.mappers.UserMapper;
import pl.project.handmadezone.api.model.User;
import pl.project.handmadezone.api.repository.UserRepository;
import pl.project.handmadezone.config.UserAuthenticationProvider;

import java.nio.CharBuffer;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final UserMapper userMapper;

    private final UserAuthenticationProvider userAuthenticationProvider;

    public UserDto login(CredentialsDto credentialsDto) {
        User user = userRepository.findByLogin(credentialsDto.getLogin())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {
            return userMapper.toUserDto(user);
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUpDto userDto) {
        Optional<User> optionalLoginUser = userRepository.findByLogin(userDto.getLogin());
        if (optionalLoginUser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        // Check if the email already exists
        Optional<User> optionalEmailUser = userRepository.findByEmail(userDto.getEmail());
        if (optionalEmailUser.isPresent()) {
            throw new AppException("Email already exists", HttpStatus.BAD_REQUEST);
        }

        User user = userMapper.signUpToUser(userDto);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));

        User savedUser = userRepository.save(user);

        return userMapper.toUserDto(savedUser);
    }

    public UserDto validateToken(String token) {
        try {
            Authentication authentication = userAuthenticationProvider.validateToken(token);
            return (UserDto) authentication.getPrincipal();
        } catch (Exception e) {
            throw new AppException("Token validation failed", HttpStatus.UNAUTHORIZED);
        }
    }
}
