# Immutly Backend Challenge

## Overview

This Java project is a backend solution for the Immutly Backend Challenge. It provides a simple Product Management System with the ability to update the price of a product through a RESTful API. The project utilizes Spring Boot and Maven.

## Getting Started

### Prerequisites

- [Java](https://www.oracle.com/java/technologies/javase-downloads.html) installed (version 8 or higher)
- [Maven](https://maven.apache.org/download.cgi) installed

### Run the Application

```bash
mvn spring-boot:run

The application will start on http://localhost:8080.

API Endpoint
Update Product Price
Endpoint: PATCH http://localhost:8080/api/v1/price-update

Request:

Method: PATCH
Body: Form Data
prodId (String): Product ID for the product you want to update.
newPrice (Double): New price for the product.

Example Request:
curl -X PATCH \
  http://localhost:8080/api/v1/price-update \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'prodId=yourProductId&newPrice=29.99'

Response:

Status Code: 200 OK
Body: JSON
status (String): Status of the operation (success or error).
message (String): A message describing the result of the operation.
data (Object): The updated product details if successful.
Example Response (Success):
{
  "status": "success",
  "message": "Product updated successfully",
  "data": {
    "prodId": "yourProductId",
    "productName": "Updated Product",
    "productDescription": "Updated Description",
    "price": 29.99,
    "availabilityStatus": true
}


Example Response (Error - Product Not Found):
{
  "status": "error",
  "message": "Product not found",
  "data": null
}

Additional Notes
Ensure that the MongoDB configuration in application.properties or application.yml is correctly set up for your environment.

