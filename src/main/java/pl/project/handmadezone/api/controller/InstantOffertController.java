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
    @GetMapping("/category/{category}")
    public List<InstantOffert> getInstantOffertsByCategory(@PathVariable String category) {
        return instantOffertService.getInstantOffertsByCategory(category);
    }
    @GetMapping("/author/{author}")
    public List<InstantOffert> getInstantOffertsByAuthor(@PathVariable String author) {
        return instantOffertService.getInstantOffertsByAuthor(author);
    }
}
