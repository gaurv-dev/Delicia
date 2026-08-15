package com.gaurav.delicia.controllers;

import com.gaurav.delicia.dto.OrderRequest;
import com.gaurav.delicia.model.Order;
import com.gaurav.delicia.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<List<Order>> getOrders(
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) String status
    ) {
        List<Order> orders;

        if (userId != null && !userId.isEmpty()) {
            orders = orderService.getOrdersByUser(userId);
        } else if (status != null && !status.isEmpty()) {
            orders = orderService.getOrdersByStatus(Order.OrderStatus.valueOf(status));
        } else {
            orders = orderService.getAllOrders();
        }

        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable String id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @PostMapping
    public ResponseEntity<Order> placeOrder(
            @RequestParam String userId,
            @RequestBody OrderRequest request
    ) {
        Order order = orderService.placeOrder(
                userId,
                request.getCart(),
                Order.OrderStatus.PENDING,
                request.getDeliveryAddress(),
                request.getDeliveryDate(),
                request.getSpecialInstructions()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable String id,
            @RequestParam String status
    ) {
        Order updated = orderService.updateOrderStatus(id, Order.OrderStatus.valueOf(status));
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Order> cancelOrder(@PathVariable String id) {
        return ResponseEntity.ok(orderService.cancelOrder(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}