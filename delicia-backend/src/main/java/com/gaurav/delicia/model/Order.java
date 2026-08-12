package com.gaurav.delicia.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "orders")
public class Order {

    @Id
    private String id;

    private String userId;

    private List<OrderItem> items;

    private Address deliveryAddress;

    private double totalAmount;

    private OrderStatus status;
    private LocalDateTime orderDate;

    private LocalDateTime deliveryDate;

    private String paymentStatus;

    private String specialInstructions;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItem {
        private String productId;
        private String productName;
        private int quantity;
        private double price;
        private String customizationNote;
    }

    public enum OrderStatus {
        PENDING,
        CONFIRMED,
        PREPARING,
        OUT_FOR_DELIVERY,
        DELIVERED,
        CANCELLED
    }
}