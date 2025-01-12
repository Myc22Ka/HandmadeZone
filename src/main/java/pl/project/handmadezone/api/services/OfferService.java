package pl.project.handmadezone.api.services;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.project.handmadezone.api.model.Offer;
import pl.project.handmadezone.api.model.OfferStatus;
import pl.project.handmadezone.api.repository.OfferRepository;
import pl.project.handmadezone.api.model.User;
import pl.project.handmadezone.api.model.OfferStatus;
import pl.project.handmadezone.api.model.OfferType;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class OfferService {

    private final OfferRepository offerRepository;

    private final UserService userService;


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
            throw new IllegalStateException("You can't buy a sold product.");
        }

        if (buyer.getCash() < offer.getPrice()) {
            throw new IllegalStateException("Insufficient funds to purchase the offer.");
        }

        if (offer.getType().equals(OfferType.QUICK_PURCHASE)) {
            User seller = userService.getSingleUser(offer.getUser().getId());

            if (buyer.getId().equals(seller.getId())) {
                throw new IllegalStateException("You can't buy your own product.");
            }

            buyer.setCash(buyer.getCash() - offer.getPrice());
            seller.setCash(seller.getCash() + offer.getPrice());

            offer.setStatus(OfferStatus.SOLD);
        }
    }

}