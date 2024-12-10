package pl.project.handmadezone.api.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import pl.project.handmadezone.api.model.Product;
import pl.project.handmadezone.api.repository.ProductRepository;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProductService {
    private static final int pageSize = 10;
    private final ProductRepository productRepository;

    public List<Product> getProducts(int pageNumber) {
        return productRepository.findAll(PageRequest.of(pageNumber, pageSize)).getContent();
    }

    public Product getSingleProduct(Long id){
        return productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + id));
    }

    public Product addProduct(Product product){
        return productRepository.save(product);
    }

    public void deleteProduct(Long id){
        if(!productRepository.existsById(id)){
            throw new EntityNotFoundException("Product not found with ID: " + id);
        }
        productRepository.deleteById(id);
    }
}
