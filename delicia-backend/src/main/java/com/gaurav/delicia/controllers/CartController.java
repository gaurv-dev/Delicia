package com.gaurav.delicia.controllers;

import com.gaurav.delicia.model.Cart;
import com.gaurav.delicia.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<Cart> getCart(@RequestParam String userId) {
        return ResponseEntity.ok(cartService.getCartByUserId(userId));
    }

    @PostMapping("/items")
    public ResponseEntity<Cart> addItem(
            @RequestParam String userId,
            @RequestParam String productId,
            @RequestParam(defaultValue = "1") int quantity,
            @RequestParam(required = false) String customizationNote
    ) {
        Cart updated = cartService.addItemToCart(userId, productId, quantity, customizationNote);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/items/{productId}")
    public ResponseEntity<Cart> updateItemQuantity(
            @RequestParam String userId,
            @PathVariable String productId,
            @RequestParam int quantity
    ) {
        Cart updated = cartService.updateItemQuantity(userId, productId, quantity);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/items/{productId}")
    public ResponseEntity<Cart> removeItem(
            @RequestParam String userId,
            @PathVariable String productId
    ) {
        Cart updated = cartService.removeItemFromCart(userId, productId);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart(@RequestParam String userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}