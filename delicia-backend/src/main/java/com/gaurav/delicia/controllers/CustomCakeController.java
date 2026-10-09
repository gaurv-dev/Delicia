package com.gaurav.delicia.controllers;

import com.gaurav.delicia.dto.CustomCakeRequest;
import com.gaurav.delicia.model.Product;
import com.gaurav.delicia.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/custom-cakes")
public class CustomCakeController {

    private static final Map<String, Integer> SIZE = Map.of("0.5kg", 400, "1kg", 700, "2kg", 1300);
    private static final Map<String, Integer> FLAVOUR = Map.of(
            "Chocolate", 0, "Vanilla", 0, "Butterscotch", 50,
            "Black Forest", 80, "Red Velvet", 100);
    private static final Map<String, Integer> SHAPE = Map.of("Round", 0, "Square", 50, "Heart", 100);
    private static final Map<Integer, Integer> TIERS = Map.of(1, 0, 2, 400, 3, 900);

    private final ProductRepository productRepository;

    public CustomCakeController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @PostMapping
    public Product create(@RequestBody CustomCakeRequest req) {
        if (!SIZE.containsKey(req.size()) || !FLAVOUR.containsKey(req.flavour())
                || !SHAPE.containsKey(req.shape()) || !TIERS.containsKey(req.tiers())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid cake options");
        }
        String msg = req.message() == null ? "" : req.message().trim();
        if (msg.length() > 40) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Message too long");
        }

        int price = SIZE.get(req.size()) + FLAVOUR.get(req.flavour())
                + SHAPE.get(req.shape()) + TIERS.get(req.tiers());

        Product p = new Product();
        p.setName("Custom " + req.flavour() + " Cake");
        p.setCategory("CUSTOM");
        p.setFlavour(req.flavour() + " · " + req.size() + " · " + req.shape()
                + " · " + req.tiers() + (req.tiers() == 1 ? " tier" : " tiers")
                + (msg.isEmpty() ? "" : " · \"" + msg + "\""));
        p.setWeight(req.size());
        p.setPrice(BigDecimal.valueOf(price));
        p.setImageUrl(req.referenceUrl() != null && !req.referenceUrl().isBlank()
                ? req.referenceUrl()
                : "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop");
        p.setAvailable(true);
        p.setStore("Delicia Central");
        return productRepository.save(p);
    }
}