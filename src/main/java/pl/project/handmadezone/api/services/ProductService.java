package pl.project.handmadezone.api.services;

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

    public List<Product> getProducts(int pageNumber){
        return productRepository.findAllProducts(PageRequest.of(pageNumber, pageSize));
    }
}
