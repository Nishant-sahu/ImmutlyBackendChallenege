package com.immutly.productmanagement.repository;

import com.immutly.productmanagement.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ProductRepository extends MongoRepository<Product, String> {
    Optional<Product> findByProdId(String prodId);
}
