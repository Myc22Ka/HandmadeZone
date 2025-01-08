package pl.project.handmadezone.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.project.handmadezone.api.dtos.OfferDto;
import pl.project.handmadezone.api.model.Offer;
import pl.project.handmadezone.api.services.OfferService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/offers")
public class OfferController {

    private final OfferService offerService;

    /**
     * Fetches a list of offers based on optional query parameters and returns them as OfferDto objects.
     *
     * @param userId id of the user who created the offer (optional).
     * @param minPrice The minimum price filter for the offers (optional).
     * @param maxPrice The maximum price filter for the offers (optional).
     * @param description The description filter for the offers (optional).
     * @return A list of OfferDto objects that match the filter criteria.
     */
    @GetMapping("/search")
    public List<OfferDto> getOffers(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String description) {

        List<Offer> offers = offerService.findOffers(userId, minPrice, maxPrice, description);
        return offers.stream()
                .map(OfferDto::fromOffer)
                .collect(Collectors.toList());
    }
}
