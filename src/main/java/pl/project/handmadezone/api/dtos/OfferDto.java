package pl.project.handmadezone.api.dtos;

import pl.project.handmadezone.api.model.Offer;
import lombok.Getter;
import lombok.Setter;
import pl.project.handmadezone.api.model.Product;

import java.time.LocalDateTime;

@Getter
@Setter
public class OfferDto {

    private Long id;
    private String title;
    private Integer price;
    private String userFirstName;
    private String userLastName;
    private Long userId;
    private String type;
    private String description;
    private Product product;
    private LocalDateTime createdAt;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String status;
    private Integer viewCount;

    public static OfferDto fromOffer(Offer offer) {
        OfferDto dto = new OfferDto();
        dto.setId(offer.getId());
        dto.setTitle(offer.getTitle());
        dto.setPrice(offer.getPrice());
        dto.setUserFirstName(offer.getUser().getFirstName());
        dto.setUserLastName(offer.getUser().getLastName());
        dto.setUserId(offer.getUser().getId());
        dto.setType(offer.getType().name());
        dto.setDescription(offer.getDescription());
        dto.setProduct(offer.getProduct());
        dto.setCreatedAt(offer.getCreatedAt());
        dto.setStartDate(offer.getStartDate());
        dto.setEndDate(offer.getEndDate());
        dto.setStatus(offer.getStatus().name());
        dto.setViewCount(offer.getViewCount());
        return dto;
    }
}
