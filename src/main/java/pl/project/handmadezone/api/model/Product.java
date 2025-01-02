package pl.project.handmadezone.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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

    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "author", nullable = false)
    private String author;

    @Column(name = "image", nullable = false)
    private String Image;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime addedAt;

    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL)
    private InstantOffert instantOffert;

    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL)
    private Auction auction;

    @PrePersist
    public void prePersist() {
        this.addedAt = LocalDateTime.now();
    }
}
