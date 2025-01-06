package pl.project.handmadezone.api.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.project.handmadezone.api.model.Auction;
import pl.project.handmadezone.api.model.Product;
import pl.project.handmadezone.api.repository.AuctionRepository;
import pl.project.handmadezone.api.repository.InstantOffertRepository;
import pl.project.handmadezone.api.repository.ProductRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuctionService {
    private final AuctionRepository auctionRepository;
    private final ProductRepository productRepository;
    private final InstantOffertRepository instantOffertRepository;

    public List<Auction> getAllActions() {
        return auctionRepository.findAll();
    }

    public Auction addAction(Auction instantOffert, Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product with ID " + productId + " does not exist"));

        instantOffert.setProduct(product);
        return auctionRepository.save(instantOffert);
    }

    public Auction getAuctionsbyCAthegory(Auction instantOffert, Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product with ID " + productId + " does not exist"));

        if (instantOffertRepository.existsByProduct(product)) {
            throw new IllegalStateException("Product with ID " + productId + " is already assigned to an instant offer.");
        }
        if (auctionRepository.existsByProduct(product)) {
            throw new IllegalStateException("Product with ID " + productId + " is already assigned to an auction.");
        }
        instantOffert.setProduct(product);
        return auctionRepository.save(instantOffert);
    }

    public List<Auction> getAuctionsByCategory(String category) {
        return auctionRepository.findByProduct_Category(category);
    }
    public List<Auction> getAuctionsByAuthor(String author) {
        return auctionRepository.findByProduct_Author(author);
    }
}
