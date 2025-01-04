package pl.project.handmadezone.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.project.handmadezone.api.model.InstantOffert;

import java.util.List;

@Repository
public interface InstantOffertRepository extends JpaRepository<InstantOffert, Long> {
    List<InstantOffert> findByProduct_Category(String category);
    List<InstantOffert> findByProduct_Author(String author);
}
