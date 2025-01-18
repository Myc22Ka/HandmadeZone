package pl.project.handmadezone.api.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class OfferSearchCriteria {
    private List<Long> offerIds;
    private Long userId;
    private Double minPrice;
    private Double maxPrice;
    private String description;
    private String title;
    private String type;
    private String userFirstName;
    private String userLastName;
    private String categoryName;
    private String productName;
    private String manufacturer;
    private Double minRating;
    private Integer minReviews;
    private String material;
    private Double minWeight;
    private Double maxWeight;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String status;
    private Integer minViewCount;
}
