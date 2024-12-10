package pl.project.handmadezone.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
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

    @GetMapping("/products/{id}")
    public Product getSingleProduct(@PathVariable Long id){
        return postService.getSingleProduct(id);
    }

    @PostMapping("/products/{id}")
    public Product addProduct(@RequestBody Product product){
        return postService.addProduct(product);
    }

    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable Long id){
        postService.deleteProduct(id);
    }
}
