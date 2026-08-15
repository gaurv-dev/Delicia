package com.gaurav.delicia.dto;

import com.gaurav.delicia.model.Address;
import com.gaurav.delicia.model.Cart;

import java.time.LocalDateTime;

public class OrderRequest {

    private Cart cart;
    private Address deliveryAddress;
    private LocalDateTime deliveryDate;
    private String specialInstructions;

    public OrderRequest() {
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public Address getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(Address deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public LocalDateTime getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(LocalDateTime deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public String getSpecialInstructions() {
        return specialInstructions;
    }

    public void setSpecialInstructions(String specialInstructions) {
        this.specialInstructions = specialInstructions;
    }
}