package com.gaurav.delicia.services;

import com.gaurav.delicia.exception.ResourceNotFoundException;
import com.gaurav.delicia.model.Cart;
import com.gaurav.delicia.model.CartItem;
import com.gaurav.delicia.model.Product;
import com.gaurav.delicia.repository.CartRepository;
import com.gaurav.delicia.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    public Cart getCartByUserId(String userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUserId(userId);
                    newCart.setItems(new ArrayList<>());
                    return cartRepository.save(newCart);
                });
    }

    public Cart addItemToCart(String userId, String productId, int quantity, String customizationNote) {
        Cart cart = getCartByUserId(userId);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        for (CartItem item : cart.getItems()) {
            if (item.getProductId().equals(productId)) {
                item.setQuantity(item.getQuantity() + quantity);
                return cartRepository.save(cart);
            }
        }

        CartItem newItem = new CartItem();
        newItem.setProductId(product.getId());
        newItem.setProductName(product.getName());
        newItem.setQuantity(quantity);
        newItem.setPrice(product.getPrice());
        newItem.setCustomizationNote(customizationNote);

        cart.getItems().add(newItem);
        return cartRepository.save(cart);
    }

    public Cart updateItemQuantity(String userId, String productId, int quantity) {
        Cart cart = getCartByUserId(userId);

        for (CartItem item : cart.getItems()) {
            if (item.getProductId().equals(productId)) {
                item.setQuantity(quantity);
                return cartRepository.save(cart);
            }
        }

        throw new ResourceNotFoundException("Product not found in cart: " + productId);
    }

    public Cart removeItemFromCart(String userId, String productId) {
        Cart cart = getCartByUserId(userId);
        cart.getItems().removeIf(item -> item.getProductId().equals(productId));
        return cartRepository.save(cart);
    }

    public void clearCart(String userId) {
        Cart cart = getCartByUserId(userId);
        cart.getItems().clear();
        cartRepository.save(cart);
    }
}