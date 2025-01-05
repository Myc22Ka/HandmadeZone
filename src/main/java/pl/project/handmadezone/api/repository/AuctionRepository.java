package pl.project.handmadezone.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.project.handmadezone.api.model.Auction;

import java.util.List;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long> {
    List<Auction> findByProduct_Category(String category);
    List<Auction> findByProduct_Author(String author);
}
