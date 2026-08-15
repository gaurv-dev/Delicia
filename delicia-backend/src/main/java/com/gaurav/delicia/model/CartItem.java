package com.gaurav.delicia.model;

import java.math.BigDecimal;

public class CartItem {

    private String productId;
    private String productName;
    private int quantity;
    private BigDecimal price;
    private String customizationNote;

    public CartItem() {
    }

    public CartItem(String productId, String productName, int quantity, BigDecimal price, String customizationNote) {
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
        this.customizationNote = customizationNote;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getCustomizationNote() {
        return customizationNote;
    }

    public void setCustomizationNote(String customizationNote) {
        this.customizationNote = customizationNote;
    }
}