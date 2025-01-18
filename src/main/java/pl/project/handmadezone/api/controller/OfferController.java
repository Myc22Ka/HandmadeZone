package pl.project.handmadezone.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import pl.project.handmadezone.api.dtos.OfferDto;
import pl.project.handmadezone.api.exceptions.GlobalException;
import pl.project.handmadezone.api.model.Offer;
import pl.project.handmadezone.api.services.OfferService;

import java.time.LocalDateTime;
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
     * @param ids A comma-separated list of offer IDs to retrieve (optional).
     * @return A list of OfferDto objects that match the filter criteria.
     */
    @GetMapping("/search")
    public List<OfferDto> getOffers(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) List<Integer> ids) {

        List<Offer> offers = offerService.findOffers(userId, minPrice, maxPrice, description);

        if (ids != null && !ids.isEmpty()) {
            offers = offers.stream()
                    .filter(offer -> ids.contains(offer.getId()))
                    .toList();
        }

        return offers.stream()
                .map(OfferDto::fromOffer)
                .collect(Collectors.toList());
    }
    @PostMapping("/{id}")
    public Offer addOffer(@RequestBody Offer offer){
        return offerService.addOffer(offer);
    }
    @PutMapping("/buy")
    public ResponseEntity<GlobalException.ErrorResponse> buy(
            @RequestParam Long buyerId,
            @RequestParam Long offerId,
            WebRequest request) {

        offerService.buy(buyerId, offerId);

        GlobalException.ErrorResponse successResponse = new GlobalException.ErrorResponse(
                LocalDateTime.now().toString(),
                HttpStatus.OK.getReasonPhrase(),
                request.getDescription(false).replace("uri=", ""),
                "Offer successfully purchased.",
                HttpStatus.OK.value()
        );

        return ResponseEntity.ok(successResponse);
    }
    @PostMapping("/{offerId}/bid")
    public ResponseEntity<Offer> placeBid(
            @PathVariable Long offerId,
            @RequestParam Long userId,
            @RequestParam Integer bidAmount
    ) {
        Offer updatedOffer = offerService.placeBid(offerId, userId, bidAmount);
        return ResponseEntity.ok(updatedOffer);
    }
}
