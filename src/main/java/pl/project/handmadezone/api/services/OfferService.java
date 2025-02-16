package pl.project.handmadezone.api.services;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import pl.project.handmadezone.api.dtos.OfferSearchCriteria;
import pl.project.handmadezone.api.exceptions.AppException;
import pl.project.handmadezone.api.model.*;
import pl.project.handmadezone.api.repository.OfferRepository;
import pl.project.handmadezone.api.repository.ProductRepository;
import pl.project.handmadezone.api.repository.UserRepository;
import java.util.List;
import java.util.function.Function;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

/**
 * Service responsible for managing offers in the HandmadeZone application.
 * Handles operations such as filtering, purchasing, and auctions.
 */
@RequiredArgsConstructor
@Service
public class OfferService {

    private final OfferRepository offerRepository;
    private final UserService userService;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    /**
     * Filters a list of offers based on a given text criterion using regular expressions.
     *
     * @param offers         the list of offers to filter
     * @param criteria       the filtering criterion
     * @param valueExtractor a function to extract a text value from the {@link Offer} object
     * @return the filtered list of offers
     */
    private List<Offer> applyRegexFilter(List<Offer> offers, String criteria, Function<Offer, String> valueExtractor) {
        if (criteria != null && !criteria.isEmpty()) {
            String[] phrases = criteria.split(",");
            return offers.stream()
                    .filter(offer -> {
                        for (String phrase : phrases) {
                            String regex = "(?i).*" + Pattern.quote(phrase.trim()) + ".*";
                            if (Pattern.compile(regex).matcher(valueExtractor.apply(offer)).matches()) {
                                return true;
                            }
                        }
                        return false;
                    })
                    .collect(Collectors.toList());
        }
        return offers;
    }

    /**
     * Finds offers based on the provided search criteria.
     *
     * @param criteria the search criteria for filtering offers
     * @return a list of offers that match the criteria
     */
    @Transactional
    public List<Offer> findOffers(OfferSearchCriteria criteria) {
        List<Offer> offers = offerRepository.findAll();

        // Filtering by various criteria
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

        offers = applyRegexFilter(offers, criteria.getDescription(), Offer::getDescription);
        offers = applyRegexFilter(offers, criteria.getTitle(), Offer::getTitle);

        return offers;
    }

    /**
     * Processes the purchase of an offer.
     *
     * @param buyerId the ID of the user making the purchase
     * @param offerId the ID of the offer being purchased
     */
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

    /**
     * Adds a new offer to the system.
     *
     * @param offer the offer to be added
     * @return the saved offer
     */
    public Offer addOffer(Offer offer) {
        Product newProduct = offer.getProduct();
        if (newProduct == null) {
            throw new IllegalArgumentException("Product data is required to create an offer.");
        }
        Product savedProduct = productRepository.save(newProduct);
        offer.setProduct(savedProduct);
        return offerRepository.save(offer);
    }

    /**
     * Places a bid on an auction offer.
     *
     * @param offerId   the ID of the offer being bid on
     * @param userId    the ID of the user placing the bid
     * @param bidAmount the amount of the bid
     * @return the updated offer after the bid
     */
    @Transactional
    public Offer placeBid(Long offerId, Long userId, Integer bidAmount) {
        Offer offer = offerRepository.findById(offerId)
                .orElseThrow(() -> new AppException("Offer not found with ID: " + offerId, HttpStatus.BAD_REQUEST));

        User bidder = userRepository.findById(userId)
                .orElseThrow(() -> new AppException("User not found with ID: " + userId, HttpStatus.BAD_REQUEST));

        if (offer.getType() != OfferType.AUCTION) {
            throw new AppException("This is not an auction.", HttpStatus.BAD_REQUEST);
        }
        if (offer.getStatus() != OfferStatus.ACTIVE) {
            throw new AppException("This offer isn't active.", HttpStatus.BAD_REQUEST);
        }
        if (bidAmount <= offer.getPrice()) {
            throw new AppException("Bid amount must be higher than the current price.", HttpStatus.BAD_REQUEST);
        }

        offer.setPrice(bidAmount);
        offer.getBidders().add(bidder);
        return offerRepository.save(offer);
    }
}
