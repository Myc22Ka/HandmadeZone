package pl.project.handmadezone.api.services;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import pl.project.handmadezone.api.exceptions.AppException;
import pl.project.handmadezone.api.model.Offer;
import pl.project.handmadezone.api.model.OfferStatus;
import pl.project.handmadezone.api.repository.OfferRepository;
import pl.project.handmadezone.api.model.User;
import pl.project.handmadezone.api.model.OfferStatus;
import pl.project.handmadezone.api.model.OfferType;
import pl.project.handmadezone.api.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class OfferService {

    private final OfferRepository offerRepository;

    private final UserService userService;

    private final UserRepository userRepository;


    public List<Offer> findOffers(Long userId, Double minPrice, Double maxPrice, String description) {
        List<Offer> offers = offerRepository.findAll();

        if (userId != null) {
            offers = offers.stream()
                    .filter(offer -> offer.getUser().getId().equals(userId))
                    .collect(Collectors.toList());
        }

        if (minPrice != null) {
            offers = offers.stream()
                    .filter(offer -> offer.getPrice() >= minPrice)
                    .collect(Collectors.toList());
        }

        if (maxPrice != null) {
            offers = offers.stream()
                    .filter(offer -> offer.getPrice() <= maxPrice)
                    .collect(Collectors.toList());
        }

        if (description != null && !description.isEmpty()) {
            offers = offers.stream()
                    .filter(offer -> offer.getDescription().toLowerCase().contains(description.toLowerCase()))
                    .collect(Collectors.toList());
        }

        return offers;
    }


    @Transactional
    public void buy(Long buyerId, Long offerId) {

        User buyer = userService.getSingleUser(buyerId);

        Offer offer = offerRepository.findById(offerId)
                .orElseThrow(() -> new EntityNotFoundException("Offer not found with ID: " + offerId));

        if (!offer.getStatus().equals(OfferStatus.ACTIVE)) {
            throw new AppException("You can't buy a sold product.", HttpStatus.BAD_REQUEST);
        }

        if (buyer.getCash() < offer.getPrice()) {
            throw new AppException("Insufficient funds to purchase the offer.", HttpStatus.BAD_REQUEST);
        }

        if (offer.getType().equals(OfferType.QUICK_PURCHASE)) {
            User seller = userService.getSingleUser(offer.getUser().getId());

            if (buyer.getId().equals(seller.getId())) {
                throw new AppException("You can't buy your own product.", HttpStatus.BAD_REQUEST);
            }

            buyer.setCash(buyer.getCash() - offer.getPrice());
            seller.setCash(seller.getCash() + offer.getPrice());

            offer.setStatus(OfferStatus.SOLD);
        }
    }
    public Offer addOffer(Offer offer){
        return offerRepository.save(offer);
    }

    @Transactional
    public Offer placeBid(Long offerId, Long userId, Integer bidAmount) {

        Offer offer = offerRepository.findById(offerId)
                .orElseThrow(() -> new AppException("Offer not found with ID: " + offerId, HttpStatus.BAD_REQUEST));

        User bidder = userRepository.findById(userId)
                .orElseThrow(() -> new AppException("User not found with ID: " + userId, HttpStatus.BAD_REQUEST));
        if (offer.getType() != OfferType.AUCTION) {
            throw new AppException("This is not auction.", HttpStatus.BAD_REQUEST);
        }
        if (bidAmount <= offer.getPrice()) {
            throw new AppException("Bid amount must be higher than the current price.", HttpStatus.BAD_REQUEST);
        }
        if (bidAmount > bidder.getCash()) {
            throw new AppException("You don't have enough cash.", HttpStatus.BAD_REQUEST);
        }
        if (bidder.getId().equals(offer.getUser().getId())) {
            throw new AppException("You can't bid your offer", HttpStatus.BAD_REQUEST);
        }
        offer.setPrice(bidAmount);

        offer.getBidders().add(bidder);

        return offerRepository.save(offer);
    }

}