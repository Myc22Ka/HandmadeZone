package pl.project.handmadezone.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.project.handmadezone.api.model.InstantOffert;
import pl.project.handmadezone.api.services.InstantOffertService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class InstantOffertController {
    private final InstantOffertService instantOffertService;

    @GetMapping("/instantOfferts")
    public List<InstantOffert> getAllInstantOfferts(){
        return instantOffertService.getAllInstantOfferts();
    }
    @PostMapping("/instantOfferts")
    public InstantOffert addInstantOffert(@RequestBody InstantOffert instantOffert, @RequestParam Long productId) {
        return instantOffertService.addInstantOffert(instantOffert, productId);
    }
    @GetMapping("/instantOfferts/{filter}")
    public List<InstantOffert> getInstantOffertsByFilter(@PathVariable String filter,
                                                         @RequestParam(required = false) String type) {
        if ("category".equalsIgnoreCase(filter)) {
            return instantOffertService.getInstantOffertsByCategory(type);
        } else if ("author".equalsIgnoreCase(filter)) {
            return instantOffertService.getInstantOffertsByAuthor(type);
        } else {
            throw new IllegalArgumentException("Invalid filter type. Allowed values: 'category' or 'author'.");
        }
    }
}
