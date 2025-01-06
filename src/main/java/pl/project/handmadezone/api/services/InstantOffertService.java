package pl.project.handmadezone.api.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.project.handmadezone.api.model.InstantOffert;
import pl.project.handmadezone.api.model.Product;
import pl.project.handmadezone.api.repository.AuctionRepository;
import pl.project.handmadezone.api.repository.InstantOffertRepository;
import pl.project.handmadezone.api.repository.ProductRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InstantOffertService {
    private final InstantOffertRepository instantOffertRepository;
    private final ProductRepository productRepository;
    private final AuctionRepository auctionRepository;

    public List<InstantOffert> getAllInstantOfferts() {
        return instantOffertRepository.findAll();
    }

    public InstantOffert addInstantOffert(InstantOffert instantOffert, Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product with ID " + productId + " does not exist"));

        instantOffert.setProduct(product);
        if (instantOffertRepository.existsByProduct(product)) {
            throw new IllegalStateException("Product with ID " + productId + " is already assigned to an instant offer.");
        }
        if (auctionRepository.existsByProduct(product)) {
            throw new IllegalStateException("Product with ID " + productId + " is already assigned to an auction.");
        }
        return instantOffertRepository.save(instantOffert);
    }

    public InstantOffert getInstantOffertbyCAthegory(InstantOffert instantOffert, Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product with ID " + productId + " does not exist"));

        instantOffert.setProduct(product);
        return instantOffertRepository.save(instantOffert);
    }

    public List<InstantOffert> getInstantOffertsByCategory(String category) {
        return instantOffertRepository.findByProduct_Category(category);
    }
    public List<InstantOffert> getInstantOffertsByAuthor(String author) {
        return instantOffertRepository.findByProduct_Author(author);
    }
}
