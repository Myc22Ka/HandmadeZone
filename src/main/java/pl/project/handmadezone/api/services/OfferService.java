package pl.project.handmadezone.api.services;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import pl.project.handmadezone.api.dtos.OfferSearchCriteria;
import pl.project.handmadezone.api.exceptions.AppException;
import pl.project.handmadezone.api.model.Offer;
import pl.project.handmadezone.api.model.OfferStatus;
import pl.project.handmadezone.api.repository.OfferRepository;
import pl.project.handmadezone.api.model.User;
import pl.project.handmadezone.api.model.OfferStatus;
import pl.project.handmadezone.api.model.OfferType;
import pl.project.handmadezone.api.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class OfferService {

    private final OfferRepository offerRepository;

    private final UserService userService;

    private final UserRepository userRepository;

    public List<Offer> findOffers(OfferSearchCriteria criteria) {
        List<Offer> offers = offerRepository.findAll();

        if (criteria.getOfferIds() != null) {
            offers = offers.stream()
                    .filter(offer -> criteria.getOfferIds().contains(offer.getId()))
                    .collect(Collectors.toList());
        }

        if (criteria.getUserId() != null) {
            offers = offers.stream()
                    .filter(offer -> offer.getUser().getId().equals(criteria.getUserId()))
                    .collect(Collectors.toList());
        }

        if (criteria.getMinPrice() != null) {
            offers = offers.stream()
                    .filter(offer -> offer.getPrice() >= criteria.getMinPrice())
                    .collect(Collectors.toList());
        }

        if (criteria.getMaxPrice() != null) {
            offers = offers.stream()
                    .filter(offer -> offer.getPrice() <= criteria.getMaxPrice())
                    .collect(Collectors.toList());
        }

        if (criteria.getDescription() != null && !criteria.getDescription().isEmpty()) {
            offers = offers.stream()
                    .filter(offer -> offer.getDescription().toLowerCase().contains(criteria.getDescription().toLowerCase()))
                    .collect(Collectors.toList());
        }

        if (criteria.getTitle() != null && !criteria.getTitle().isEmpty()) {
            offers = offers.stream()
                    .filter(offer -> offer.getTitle().toLowerCase().contains(criteria.getTitle().toLowerCase()))
                    .collect(Collectors.toList());
        }

        if (criteria.getType() != null) {
            offers = offers.stream()
                    .filter(offer -> offer.getType() == OfferType.valueOf(criteria.getType().toUpperCase()))
                    .collect(Collectors.toList());
        }

        if (criteria.getUserFirstName() != null && !criteria.getUserFirstName().isEmpty()) {
            offers = offers.stream()
                    .filter(offer -> offer.getUser().getFirstName().equalsIgnoreCase(criteria.getUserFirstName()))
                    .collect(Collectors.toList());
        }

        if (criteria.getUserLastName() != null && !criteria.getUserLastName().isEmpty()) {
            offers = offers.stream()
                    .filter(offer -> offer.getUser().getLastName().equalsIgnoreCase(criteria.getUserLastName()))
                    .collect(Collectors.toList());
        }

        if (criteria.getCategoryName() != null && !criteria.getCategoryName().isEmpty() && !"all".equalsIgnoreCase(criteria.getCategoryName())) {
            offers = offers.stream()
                    .filter(offer -> offer.getProduct().getCategory().getName().equalsIgnoreCase(criteria.getCategoryName()))
                    .collect(Collectors.toList());
        }

        if (criteria.getProductName() != null && !criteria.getProductName().isEmpty()) {
            offers = offers.stream()
                    .filter(offer -> offer.getProduct().getName().equalsIgnoreCase(criteria.getProductName()))
                    .collect(Collectors.toList());
        }

        if (criteria.getManufacturer() != null && !criteria.getManufacturer().isEmpty()) {
            offers = offers.stream()
                    .filter(offer -> offer.getProduct().getManufacturer().equalsIgnoreCase(criteria.getManufacturer()))
                    .collect(Collectors.toList());
        }

        if (criteria.getMinRating() != null) {
            offers = offers.stream()
                    .filter(offer -> offer.getProduct().getRating() >= criteria.getMinRating())
                    .collect(Collectors.toList());
        }

        if (criteria.getMinReviews() != null) {
            offers = offers.stream()
                    .filter(offer -> offer.getProduct().getReviews() >= criteria.getMinReviews())
                    .collect(Collectors.toList());
        }

        if (criteria.getMaterial() != null && !criteria.getMaterial().isEmpty()) {
            offers = offers.stream()
                    .filter(offer -> offer.getProduct().getMaterial().equalsIgnoreCase(criteria.getMaterial()))
                    .collect(Collectors.toList());
        }

        if (criteria.getMinWeight() != null) {
            offers = offers.stream()
                    .filter(offer -> offer.getProduct().getWeight().getAmount() >= criteria.getMinWeight())
                    .collect(Collectors.toList());
        }

        if (criteria.getMaxWeight() != null) {
            offers = offers.stream()
                    .filter(offer -> offer.getProduct().getWeight().getAmount() <= criteria.getMaxWeight())
                    .collect(Collectors.toList());
        }

        if (criteria.getStartDate() != null) {
            offers = offers.stream()
                    .filter(offer -> offer.getStartDate().isAfter(criteria.getStartDate()) || offer.getStartDate().isEqual(criteria.getStartDate()))
                    .collect(Collectors.toList());
        }

        if (criteria.getEndDate() != null) {
            offers = offers.stream()
                    .filter(offer -> offer.getEndDate().isBefore(criteria.getEndDate()) || offer.getEndDate().isEqual(criteria.getEndDate()))
                    .collect(Collectors.toList());
        }

        if (criteria.getStatus() != null) {
            offers = offers.stream()
                    .filter(offer -> offer.getStatus() == OfferStatus.valueOf(criteria.getStatus().toUpperCase()))
                    .collect(Collectors.toList());
        }

        if (criteria.getMinViewCount() != null) {
            offers = offers.stream()
                    .filter(offer -> offer.getViewCount() >= criteria.getMinViewCount())
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