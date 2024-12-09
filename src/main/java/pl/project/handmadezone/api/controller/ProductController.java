package pl.project.handmadezone.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.project.handmadezone.api.model.Product;
import pl.project.handmadezone.api.services.ProductService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProductController {
    private final ProductService postService;

    @GetMapping("/products")
    public List<Product> getProducts(@RequestParam(required = false) Integer page) {
        int pageNumber = page != null && page > 0 ? page : 1;
        return postService.getProducts(pageNumber - 1);
    }
}
