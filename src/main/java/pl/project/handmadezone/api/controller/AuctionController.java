package pl.project.handmadezone.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.project.handmadezone.api.model.Auction;
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
    @GetMapping("auctions/category/{category}")
    public List<Auction> getInstantOffertsByCategory(@PathVariable String category) {
        return auctionService.getInstantOffertsByCategory(category);
    }
    @GetMapping("auctions/author/{author}")
    public List<Auction> getInstantOffertsByAuthor(@PathVariable String author) {
        return auctionService.getInstantOffertsByAuthor(author);
    }
}
