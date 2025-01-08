package pl.project.handmadezone.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.project.handmadezone.api.model.Category;
import pl.project.handmadezone.api.services.CategoryService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categories")  // Base URL for every method in this REST Controller
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    /**
     * Retrieves all categories in the system.
     *
     * @return a ResponseEntity containing a list of all categories
     */
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    /**
     * Retrieves a category by its ID.
     *
     * @param id the ID of the category to retrieve
     * @return a ResponseEntity containing the category if found, or 404 Not Found if not
     */
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Optional<Category> category = categoryService.getCategoryById(id);
        return category.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Retrieves categories by their name.
     *
     * @param name the name of the category to search for
     * @return a ResponseEntity containing a list of categories matching the name
     */
    @GetMapping("/search")
    public ResponseEntity<List<Category>> getCategoriesByName(@RequestParam String name) {
        List<Category> categories = categoryService.getCategoriesByName(name);
        return ResponseEntity.ok(categories);
    }
}
