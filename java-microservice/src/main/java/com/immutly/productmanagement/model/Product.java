package com.immutly.productmanagement.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Document(collection = "products")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    private String id;

    private String prodId;

    private String productName;
    private String productDescription;
    private double price;
    private boolean availabilityStatus;

}
