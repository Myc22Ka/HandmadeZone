package pl.project.handmadezone.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import pl.project.handmadezone.api.dtos.UserDto;
import pl.project.handmadezone.api.exceptions.AppException;
import pl.project.handmadezone.api.model.User;
import pl.project.handmadezone.api.repository.UserRepository;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;

@RequiredArgsConstructor
@Component
public class UserAuthenticationProvider {

    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    private final UserRepository userRepository;

    @PostConstruct
    protected void init() {
        // this is to avoid having the raw secret key available in the JVM
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(String login) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 3600000); // 1 hour
//        Date validity = new Date(now.getTime() + 10000); // 10 seconds

        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        return JWT.create()
                .withSubject(login)
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .sign(algorithm);
    }

    public Authentication validateToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decoded = verifier.verify(token);

        // Sprawdź, czy token nie wygasł
        if (decoded.getExpiresAt().before(new Date())) {
            throw new AppException("Token has expired", HttpStatus.UNAUTHORIZED);
        }

        // Sprawdzenie, czy użytkownik istnieje
        User user = userRepository.findByLogin(decoded.getSubject())
                .orElseThrow(() -> new AppException("User not found", HttpStatus.NOT_FOUND));

        // Generowanie nowego tokenu
        String newToken = createToken(user.getLogin());

        // Tworzenie obiektu UserDto z nowym tokenem
        UserDto userDto = UserDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .login(user.getLogin())
                .cash(user.getCash())
                .token(newToken)
                .build();

        // Zwrócenie uwierzytelnionego użytkownika
        return new UsernamePasswordAuthenticationToken(userDto, null, Collections.emptyList());
    }
}
