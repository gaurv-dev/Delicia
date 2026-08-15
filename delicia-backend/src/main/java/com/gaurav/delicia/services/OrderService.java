package com.gaurav.delicia.services;

import com.gaurav.delicia.exception.ResourceNotFoundException;
import com.gaurav.delicia.model.Address;
import com.gaurav.delicia.model.Cart;
import com.gaurav.delicia.model.CartItem;
import com.gaurav.delicia.model.Order;
import com.gaurav.delicia.model.Product;
import com.gaurav.delicia.repository.OrderRepository;
import com.gaurav.delicia.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    public Order placeOrder(String userId, Cart cart, Order.OrderStatus initialStatus,
                            Address deliveryAddress,
                            LocalDateTime deliveryDate, String specialInstructions) {

        if (cart == null || cart.getItems() == null || cart.getItems().isEmpty()) {
            throw new IllegalStateException("Cannot place an order with an empty cart");
        }

        List<Order.OrderItem> orderItems = cart.getItems().stream()
                .map(this::toOrderItem)
                .collect(Collectors.toList());

        BigDecimal total = orderItems.stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = new Order();
        order.setUserId(userId);
        order.setItems(orderItems);
        order.setDeliveryAddress(deliveryAddress);
        order.setTotalAmount(total);
        order.setStatus(initialStatus != null ? initialStatus : Order.OrderStatus.PENDING);
        order.setOrderDate(LocalDateTime.now());
        order.setDeliveryDate(deliveryDate);
        order.setPaymentStatus("UNPAID");
        order.setSpecialInstructions(specialInstructions);

        return orderRepository.save(order);
    }

    private Order.OrderItem toOrderItem(CartItem cartItem) {
        Product product = productRepository.findById(cartItem.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Product not found with id: " + cartItem.getProductId()));

        Order.OrderItem item = new Order.OrderItem();
        item.setProductId(product.getId());
        item.setProductName(product.getName());
        item.setQuantity(cartItem.getQuantity());
        item.setPrice(product.getPrice());
        item.setCustomizationNote(cartItem.getCustomizationNote());
        return item;
    }

    public List<Order> getOrdersByUser(String userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getOrdersByStatus(Order.OrderStatus status) {
        return orderRepository.findByStatus(status);
    }

    public Order getOrderById(String orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateOrderStatus(String orderId, Order.OrderStatus newStatus) {
        Order order = getOrderById(orderId);
        order.setStatus(newStatus);
        return orderRepository.save(order);
    }

    public Order cancelOrder(String orderId) {
        Order order = getOrderById(orderId);
        if (order.getStatus() == Order.OrderStatus.DELIVERED) {
            throw new IllegalStateException("Cannot cancel an order that has already been delivered");
        }
        order.setStatus(Order.OrderStatus.CANCELLED);
        return orderRepository.save(order);
    }

    public void deleteOrder(String orderId) {
        if (!orderRepository.existsById(orderId)) {
            throw new ResourceNotFoundException("Order not found with id: " + orderId);
        }
        orderRepository.deleteById(orderId);
    }
}