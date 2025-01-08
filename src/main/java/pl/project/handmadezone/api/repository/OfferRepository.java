package pl.project.handmadezone.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.project.handmadezone.api.model.Offer;

import java.util.List;

public interface OfferRepository extends JpaRepository<Offer, Long> {
    List<Offer> findByUserLoginContainingIgnoreCase(String login);
    List<Offer> findByPriceGreaterThanEqual(Double minPrice);
    List<Offer> findByPriceLessThanEqual(Double maxPrice);
    List<Offer> findByDescriptionContainingIgnoreCase(String description);
}
