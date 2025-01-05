package pl.project.handmadezone.api.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.project.handmadezone.api.model.Auction;
import pl.project.handmadezone.api.model.Product;
import pl.project.handmadezone.api.repository.AuctionRepository;
import pl.project.handmadezone.api.repository.ProductRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuctionService {
    private final AuctionRepository auctionRepository;
    private final ProductRepository productRepository;

    public List<Auction> getAllActions() {
        return auctionRepository.findAll();
    }

    public Auction addAction(Auction instantOffert, Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product with ID " + productId + " does not exist"));

        instantOffert.setProduct(product);
        return auctionRepository.save(instantOffert);
    }

    public Auction getInstantOffertbyCAthegory(Auction instantOffert, Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product with ID " + productId + " does not exist"));

        instantOffert.setProduct(product);
        return auctionRepository.save(instantOffert);
    }

    public List<Auction> getInstantOffertsByCategory(String category) {
        return auctionRepository.findByProduct_Category(category);
    }
    public List<Auction> getInstantOffertsByAuthor(String author) {
        return auctionRepository.findByProduct_Author(author);
    }
}
