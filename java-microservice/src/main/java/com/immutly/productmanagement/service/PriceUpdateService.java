package com.immutly.productmanagement.service;


import com.immutly.productmanagement.dto.ApiResponse;
import com.immutly.productmanagement.model.Product;
import com.immutly.productmanagement.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PriceUpdateService {
    private final ProductRepository productRepository;

    @Autowired
    public PriceUpdateService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ApiResponse processPriceUpdate(String prodId, double newPrice) {

        Optional<Product> optionalProduct = productRepository.findByProdId(prodId);
        System.out.println(prodId);
        if(optionalProduct.isEmpty())  return new ApiResponse("error" , "Product not found" , null);

        Product product = optionalProduct.get();
        product.setPrice(newPrice);
        productRepository.save(product);

        return new ApiResponse("success" , "Product updated successfully" , product);
    }



}
