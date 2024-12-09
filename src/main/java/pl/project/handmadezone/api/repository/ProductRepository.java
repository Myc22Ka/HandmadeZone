package pl.project.handmadezone.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.project.handmadezone.api.model.Product;

/**
 * Repository interface for accessing Product entities in the database.
 * This interface extends JpaRepository to provide basic CRUD operations
 * for Product entities.
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
