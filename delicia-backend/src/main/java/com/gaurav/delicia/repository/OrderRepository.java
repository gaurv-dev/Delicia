package com.gaurav.delicia.repository;

import com.gaurav.delicia.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {

    List<Order> findByUserId(String userId);
    List<Order> findByStatus(Order.OrderStatus status);
    List<Order> findByUserIdAndStatus(String userId, Order.OrderStatus status);
}