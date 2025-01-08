package pl.project.handmadezone.api.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.project.handmadezone.api.model.Category;
import pl.project.handmadezone.api.repository.CategoryRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    /**
     * Finds all categories in the system.
     *
     * @return a list of all categories
     */
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    /**
     * Finds a category by its ID.
     *
     * @param id the ID of the category to be found
     * @return an Optional containing the category if found, or empty if not
     */
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    /**
     * Finds categories by their name.
     *
     * @param name the name of the category to search for
     * @return a list of categories matching the given name
     */
    public List<Category> getCategoriesByName(String name) {
        return categoryRepository.findByName(name);
    }
}
