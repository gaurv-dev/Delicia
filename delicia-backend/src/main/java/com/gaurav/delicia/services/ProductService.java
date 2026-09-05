package com.gaurav.delicia.services;

import com.gaurav.delicia.exception.ResourceNotFoundException;
import com.gaurav.delicia.model.Product;
import com.gaurav.delicia.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }

    public List<Product> getEgglessProducts(boolean eggless) {
        return productRepository.findByEggless(eggless);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(String id, Product updatedProduct) {
        Product existing = getProductById(id);

        existing.setName(updatedProduct.getName());
        existing.setPrice(updatedProduct.getPrice());
        existing.setCategory(updatedProduct.getCategory());
        existing.setFlavour(updatedProduct.getFlavour());
        existing.setEggless(updatedProduct.isEggless());
        existing.setWeight(updatedProduct.getWeight());
        existing.setStore(updatedProduct.getStore());
        existing.setImageUrl(updatedProduct.getImageUrl());
        existing.setFeatured(updatedProduct.isFeatured());
        existing.setAvailable(updatedProduct.isAvailable());

        return productRepository.save(existing);
    }

    public void deleteProduct(String id) {
        Product existing = getProductById(id);
        productRepository.delete(existing);
    }
}