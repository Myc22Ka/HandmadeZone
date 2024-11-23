package pl.project.handmadezone.auth.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.io.IOException;

@RestController
public class OAuth2RedirectController {

    private final ClientRegistrationRepository clientRegistrationRepository;

    public OAuth2RedirectController(ClientRegistrationRepository clientRegistrationRepository) {
        this.clientRegistrationRepository = clientRegistrationRepository;
    }

    @GetMapping("/oauth2/redirect")
    public void redirectToProvider(@RequestParam("service") String service, HttpServletResponse response) throws IOException {
        String redirectUrl = "/oauth2/authorization/" + service.toLowerCase();

        System.out.println(service);

        if (clientRegistrationRepository.findByRegistrationId(service.toLowerCase()) == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid OAuth2 provider: " + service);
            return;
        }

        response.sendRedirect(redirectUrl);
    }
}
