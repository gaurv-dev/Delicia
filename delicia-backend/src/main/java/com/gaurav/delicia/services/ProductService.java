
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

    public List<Product> getAllProducts(String search) {
        return productRepository.findAll();
    }

    public Product getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(String id, Product product) {
        return productRepository.save(product);
    }

    public Product deleteProduct(String id) {
        return productRepository.save(getProductById(id));
    }
}