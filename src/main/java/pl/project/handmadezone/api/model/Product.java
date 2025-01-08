package pl.project.handmadezone.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.project.handmadezone.api.model.measurements.Dimensions;
import pl.project.handmadezone.api.model.measurements.Weight;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "manufacturer", nullable = false)
    private String manufacturer;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "unit", column = @Column(name = "dimensions_unit")),
            @AttributeOverride(name = "height", column = @Column(name = "dimensions_height")),
            @AttributeOverride(name = "width", column = @Column(name = "dimensions_width")),
            @AttributeOverride(name = "depth", column = @Column(name = "dimensions_depth"))
    })
    private Dimensions dimensions;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "unit", column = @Column(name = "weight_unit")),
            @AttributeOverride(name = "amount", column = @Column(name = "weight_amount"))
    })
    private Weight weight;

    @Column(name = "material", nullable = false)
    private String material;

    @Column(name = "rating", nullable = false)
    private Float rating;

    @Column(name = "reviews", nullable = false)
    private Integer reviews;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;
}
