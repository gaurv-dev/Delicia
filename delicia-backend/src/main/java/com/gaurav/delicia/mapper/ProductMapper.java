package com.gaurav.delicia.mapper;

import com.gaurav.delicia.dto.ProductRequest;
import com.gaurav.delicia.dto.ProductResponse;
import com.gaurav.delicia.model.Product;

public class ProductMapper {

    // Convert incoming request -> entity (for create/update)
    public static Product toEntity(ProductRequest request) {
        if (request == null) {
            return null;
        }
        Product product = new Product();
        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setCategory(request.getCategory());
        product.setFlavour(request.getFlavour());
        product.setEggless(request.isEggless());
        product.setWeight(request.getWeight());
        product.setStore(request.getStore());
        product.setImageUrl(request.getImageUrl());
        product.setFeatured(request.isFeatured());
        product.setAvailable(request.isAvailable());
        return product;
    }

    // Convert entity -> outgoing response
    public static ProductResponse toResponse(Product product) {
        if (product == null) {
            return null;
        }
        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setPrice(product.getPrice());
        response.setCategory(product.getCategory());
        response.setFlavour(product.getFlavour());
        response.setEggless(product.isEggless());
        response.setWeight(product.getWeight());
        response.setStore(product.getStore());
        response.setRating(product.getRating());
        response.setImageUrl(product.getImageUrl());
        response.setFeatured(product.isFeatured());
        response.setAvailable(product.isAvailable());
        response.setCreatedDate(product.getCreatedDate());
        return response;
    }
}