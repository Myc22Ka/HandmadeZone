package pl.project.handmadezone.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import pl.project.handmadezone.api.exceptions.AppException;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final UserAuthenticationProvider userAuthenticationProvider;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String header = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (header != null) {
            String[] authElements = header.split(" ");

            if (authElements.length == 2 && "Bearer".equals(authElements[0])) {
                try {
                    SecurityContextHolder.getContext().setAuthentication(
                            userAuthenticationProvider.validateToken(authElements[1]));
                } catch (AppException e) {
                    // Obsługa błędu związana z tokenem
                    handleAuthError(response, e.getStatus(), e.getMessage());
                    return; // Przerwij dalsze przetwarzanie
                } catch (RuntimeException e) {
                    // Obsługa innych wyjątków
                    handleAuthError(response, HttpStatus.UNAUTHORIZED, "Invalid or expired token");
                    return; // Przerwij dalsze przetwarzanie
                }
            }
        }

        filterChain.doFilter(request, response);
    }

    private void handleAuthError(HttpServletResponse response, HttpStatus status, String message) throws IOException {
        response.setStatus(status.value());
        response.setContentType("application/json");
        response.getWriter().write(String.format(
                "{\"timestamp\":\"%s\",\"status\":%d,\"error\":\"%s\",\"message\":\"%s\"}",
                java.time.LocalDateTime.now(),
                status.value(),
                status.getReasonPhrase(),
                message
        ));
    }
}
