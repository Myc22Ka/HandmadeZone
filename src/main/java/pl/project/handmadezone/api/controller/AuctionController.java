package pl.project.handmadezone.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.project.handmadezone.api.model.Auction;
import pl.project.handmadezone.api.model.InstantOffert;
import pl.project.handmadezone.api.services.AuctionService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AuctionController {
    private final AuctionService auctionService;

    @GetMapping("/auctions")
    public List<Auction> getAllInstantOfferts(){
        return auctionService.getAllActions();
    }
    @PostMapping("/auctions")
    public Auction addInstantOffert(@RequestBody Auction instantOffert, @RequestParam Long productId) {
        return auctionService.addAction(instantOffert, productId);
    }
    @GetMapping("/auctions/{filter}")
    public List<Auction> getAuctionsByFilter(@PathVariable String filter,
                                                         @RequestParam(required = false) String type) {
        if ("category".equalsIgnoreCase(filter)) {
            return auctionService.getAuctionsByCategory(type);
        } else if ("author".equalsIgnoreCase(filter)) {
            return auctionService.getAuctionsByAuthor(type);
        } else {
            throw new IllegalArgumentException("Invalid filter type. Allowed values: 'category' or 'author'.");
        }
    }
}
