package pl.project.handmadezone.api.services;

import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.Transient;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import pl.project.handmadezone.api.model.Product;
import pl.project.handmadezone.api.repository.ProductRepository;

import java.util.List;

/**
 * Service class for managing products.
 * This class contains business logic for handling operations related to products.
 *
 */
@RequiredArgsConstructor
@Service
public class ProductService {
    private final ProductRepository productRepository;

    /**
     * Retrieves a paginated list of products.
     *
     * @return a list of Product objects representing the products
     */
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    /**
     * Retrieves a single product by its ID.
     *
     * @param id the ID of the product to retrieve
     * @return the Product object representing the requested product
     * @throws EntityNotFoundException if the product with the given ID does not exist
     */
    public Product getSingleProduct(Long id){
        return productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + id));
    }

    /**
     * Adds a new product.
     *
     * @param product the Product object to be added
     * @return the added Product object
     */
    public Product addProduct(Product product){
        return productRepository.save(product);
    }

    /**
     * Deletes a product by its ID.
     *
     * @param id the ID of the product to be deleted
     * @throws EntityNotFoundException if the product with the given ID does not exist
     */
    public void deleteProduct(Long id){
        if(!productRepository.existsById(id)){
            throw new EntityNotFoundException("Product not found with ID: " + id);
        }
        productRepository.deleteById(id);
    }

    /**
     * Edits an existing product.
     *
     * @param product the Product object containing updated information
     * @return the updated Product object
     * @throws EntityNotFoundException if the product with the given ID does not exist
     */
    @Transactional
    public Product editProduct(Product product){
        Product productEdited = productRepository.findById(product.getId()).orElseThrow();
        if (product.getName() != null) {
            productEdited.setName(product.getName());
        }
        if (product.getCategory() != null) {
            productEdited.setCategory(product.getCategory());
        }
        if (product.getManufacturer() != null) {
            productEdited.setManufacturer(product.getManufacturer());
        }
        if (product.getImageUrl() != null) {
            productEdited.setImageUrl(product.getImageUrl());
        }
        return productEdited;
    }

}
