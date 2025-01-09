package pl.project.handmadezone.api.services;

import org.springframework.stereotype.Service;
import pl.project.handmadezone.api.model.Offer;
import pl.project.handmadezone.api.repository.OfferRepository;
import pl.project.handmadezone.api.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OfferService {

    private final OfferRepository offerRepository;

    public OfferService(OfferRepository offerRepository, UserRepository userRepository) {
        this.offerRepository = offerRepository;
        // Add this to fetch the user by name
    }

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

    public Optional<Offer> getOfferById(Long id) {
        return offerRepository.findById(id);
    }

    public List<Offer> getOffersByIds(List<Long> ids) {
        return offerRepository.findAllById(ids);
    }
}