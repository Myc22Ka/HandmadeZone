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
import java.util.function.Function;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class OfferService {

    private final OfferRepository offerRepository;

    private final UserService userService;

    private final UserRepository userRepository;

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

    @Transactional
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

        // Apply regex-based filtering for text fields
        offers = applyRegexFilter(offers, criteria.getDescription(), Offer::getDescription);
        offers = applyRegexFilter(offers, criteria.getTitle(), Offer::getTitle);
        offers = applyRegexFilter(offers, criteria.getUserFirstName(), offer -> offer.getUser().getFirstName());
        offers = applyRegexFilter(offers, criteria.getUserLastName(), offer -> offer.getUser().getLastName());
        offers = applyRegexFilter(offers, criteria.getProductName(), offer -> offer.getProduct().getName());
        offers = applyRegexFilter(offers, criteria.getManufacturer(), offer -> offer.getProduct().getManufacturer());

        if (criteria.getCategoryName() != null && !criteria.getCategoryName().isEmpty() && !"all".equalsIgnoreCase(criteria.getCategoryName())) {
            offers = offers.stream()
                    .filter(offer -> offer.getProduct().getCategory().getName().equalsIgnoreCase(criteria.getCategoryName()))
                    .collect(Collectors.toList());
        }

        if (criteria.getType() != null) {
            offers = offers.stream()
                    .filter(offer -> offer.getType() == OfferType.valueOf(criteria.getType().toUpperCase()))
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
        LocalDateTime currentTime = LocalDateTime.now();
        for(Offer offer : offers){
            if(offer.getType() == OfferType.AUCTION){
                if(offer.getStatus() == OfferStatus.ACTIVE) {
                    if (currentTime.isAfter(offer.getEndDate())) {
                        winAuction(offer.getId());
                    }
                }
            }
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

    @Transactional
    public void winAuction(Long offerId) {

        Offer offer = offerRepository.findById(offerId)
                .orElseThrow(() -> new EntityNotFoundException("Offer not found with ID: " + offerId));

        if (offer.getType().equals(OfferType.AUCTION)) {
            User seller = userService.getSingleUser(offer.getUser().getId());
            List<User> bidders = offer.getBidders();
            if (bidders.isEmpty()) {
                offer.setStatus(OfferStatus.EXPIRED);
            } else{
                User buyer = bidders.getLast();
                if (buyer.getCash() < offer.getPrice()) {
                    throw new AppException("Insufficient funds to purchase the offer.", HttpStatus.BAD_REQUEST);
                }
                if (!offer.getStatus().equals(OfferStatus.ACTIVE)) {
                    throw new AppException("You can't buy a sold product.", HttpStatus.BAD_REQUEST);
                }
                buyer.setCash(buyer.getCash() - offer.getPrice());
                seller.setCash(seller.getCash() + offer.getPrice());

                offer.setStatus(OfferStatus.SOLD);
            }

        }
        else{
            throw new AppException("It's not an auction.", HttpStatus.BAD_REQUEST);
        }
    }

}