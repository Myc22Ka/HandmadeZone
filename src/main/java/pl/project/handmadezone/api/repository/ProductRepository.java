package pl.project.handmadezone.api.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.project.handmadezone.api.model.Product;

import java.util.List;

/**
 * Repository interface for accessing Product entities in the database.
 * This interface extends JpaRepository to provide basic CRUD operations
 * for Product entities. It also includes custom query methods for retrieving
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    /**
     * Retrieves all Products from the database, including their associated comments.
     *
     * @param page Pageable object to control pagination information
     * @return List of products with their comments
     */
    @Query("SELECT p FROM Product p")
    List<Product> findAllProducts(Pageable page);
}