package pl.project.handmadezone.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import pl.project.handmadezone.api.dtos.OfferDto;
import pl.project.handmadezone.api.dtos.OfferSearchCriteria;
import pl.project.handmadezone.api.exceptions.GlobalException;
import pl.project.handmadezone.api.model.Offer;
import pl.project.handmadezone.api.services.OfferService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/offers")
public class OfferController {

    private final OfferService offerService;

    /**
     * Fetches a list of offers based on provided search criteria.
     *
     * @param criteria The search criteria for filtering offers.
     * @return A list of matching OfferDto objects.
     */
    @PostMapping("/search")
    public List<OfferDto> searchOffers(@RequestBody OfferSearchCriteria criteria) {
        List<Offer> offers = offerService.findOffers(criteria);

        return offers.stream()
                .map(OfferDto::fromOffer)
                .collect(Collectors.toList());
    }

    @PostMapping("/add/{id}")
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

    @PutMapping("/buy-cart")
    public ResponseEntity<GlobalException.ErrorResponse> buyCart(
            @RequestParam Long buyerId,
            @RequestParam ArrayList<Long> offersIds,
            WebRequest request) {

        offerService.buyCart(buyerId, offersIds);

        GlobalException.ErrorResponse successResponse = new GlobalException.ErrorResponse(
                LocalDateTime.now().toString(),
                HttpStatus.OK.getReasonPhrase(),
                request.getDescription(false).replace("uri=", ""),
                "Offers successfully purchased.",
                HttpStatus.OK.value()
        );

        return ResponseEntity.ok(successResponse);
    }

    @PutMapping("/{offerId}/bid")
    public ResponseEntity<String> placeBid(
            @PathVariable Long offerId,
            @RequestParam Long userId,
            @RequestParam Integer bidAmount
    ) {
        offerService.placeBid(offerId, userId, bidAmount);
        String successMessage = "Bid placed successfully. New price: " + bidAmount;
        return ResponseEntity.ok(successMessage);
    }

    @PutMapping("/win-auction")
    public ResponseEntity<GlobalException.ErrorResponse> winAuction(
            @RequestParam Long offerId,
            WebRequest request) {

        offerService.winAuction(offerId);

        GlobalException.ErrorResponse successResponse = new GlobalException.ErrorResponse(
                LocalDateTime.now().toString(),
                HttpStatus.OK.getReasonPhrase(),
                request.getDescription(false).replace("uri=", ""),
                "Offer successfully purchased.",
                HttpStatus.OK.value()
        );

        return ResponseEntity.ok(successResponse);
    }
}
