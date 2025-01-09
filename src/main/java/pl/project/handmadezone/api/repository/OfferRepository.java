package pl.project.handmadezone.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.project.handmadezone.api.model.Offer;

public interface OfferRepository extends JpaRepository<Offer, Long> {

}
