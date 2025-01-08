package pl.project.handmadezone.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.project.handmadezone.api.model.Product;
import pl.project.handmadezone.api.services.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    /**
     * Retrieves a list of all products.
     *
     * @return A list of all Product objects.
     */
    @GetMapping
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    /**
     * Retrieves a single product by its ID.
     *
     * @param id The ID of the product to be retrieved.
     * @return The Product object corresponding to the given ID.
     */
    @GetMapping("/{id}")
    public Product getSingleProduct(@PathVariable Long id){
        return productService.getSingleProduct(id);
    }

    /**
     * Adds a new product.
     *
     * @param product The Product object to be added.
     * @return The added Product object.
     */
    @PostMapping("/{id}")
    public Product addProduct(@RequestBody Product product){
        return productService.addProduct(product);
    }

    /**
     * Deletes a product by its ID.
     *
     * @param id The ID of the product to be deleted.
     */
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);
    }
}