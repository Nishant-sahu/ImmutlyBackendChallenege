# Immutly B2B SaaS Product API

Welcome to the Immutly B2B SaaS Product API! This API provides a backend service for a digital product management system, offering CRUD (Create, Read, Update, Delete) operations for digital products.

## Table of Contents
- [Immutly B2B SaaS Product API](#immutly-b2b-saas-product-api)
  - [Table of Contents](#table-of-contents)
  - [Technology Stack](#technology-stack)
  - [Authentication](#authentication)
  - [Endpoints](#endpoints)
    - [1. Get All Products](#1-get-all-products)
    - [2. Get Product by ID](#2-get-product-by-id)
    - [3. Create New Product](#3-create-new-product)
    - [4. Update Product by ID](#4-update-product-by-id)
    - [5. Delete Product by ID](#5-delete-product-by-id)
  - [Validation](#validation)
  - [Error Handling](#error-handling)
  - [Documentation](#documentation)
  - [Testing](#testing)
  - [Bonus Features](#bonus-features)
    - [1. Authentication Mechanism](#1-authentication-mechanism)
    - [2. Filtering Products](#2-filtering-products)

## Technology Stack
- Node.JS for the main server-side logic
- Java for a secondary service that processes product price updates
- MongoDB for the database

## Authentication
To access the Immutly API, include the following authentication token in the headers of your requests:

## Endpoints

### 1. Get All Products
- **Endpoint:** `GET /api/v1/products`
- **Description:** Retrieve a list of all products.
- **Request:** No request body needed.
- **Response:** 
  - Status: 200 OK
  - Body: An array containing product details.

### 2. Get Product by ID
- **Endpoint:** `GET /api/v1/products/{product_id}`
- **Description:** Retrieve details of a specific product by its ID.
- **Request:** No request body needed.
- **Response:** 
  - Status: 200 OK
  - Body: Details of the requested product.
  - Status: 404 Not Found if the product with the specified ID does not exist.

### 3. Create New Product
- **Endpoint:** `POST /api/v1/products`
- **Description:** Add a new product to the system.
- **Request:** 
  - Body: JSON object containing product details.
    ```
    {
      "prodId" : "30629c04-1a34-4b9c-89b2-19c8196fb269",
      "productName": "Product Name",
      "productDescription": "Product Description",
      "price": 29.99,
      "availabilityStatus": true
    }
    ```
- **Response:** 
  - Status: 200 OK
  - Body: Details of the newly created product.
  - Status: 400 Bad Request if the request is malformed.

### 4. Update Product by ID
- **Endpoint:** `PUT /api/v1/products/{product_id}`
- **Description:** Update details of a specific product by its ID.
- **Request:** 
  - Body: JSON object containing updated product details.
    ```
    {
      "prodId" : "30629c04-1a34-4b9c-89b2-19c8196fb269",
      "productName": "Updated Product Name",
      "productDescription": "Updated Product Description",
      "price": 39.99,
      "availabilityStatus": false
    }
    ```
- **Response:** 
  - Status: 200 OK
  - Body: Details of the updated product.
  - Status: 404 Not Found if the product with the specified ID does not exist.
  - Status: 400 Bad Request if the request is malformed.

### 5. Delete Product by ID
- **Endpoint:** `DELETE /api/v1/products/{product_id}`
- **Description:** Remove a specific product by its ID.
- **Request:** No request body needed.
- **Response:** 
  - Status: 200 OK
  - Body: Details of the deleted product.
  - Status: 404 Not Found if the product with the specified ID does not exist.

## Validation
- Ensure all necessary fields are provided when creating or updating products.
- Ensure the product price is a positive value.

## Error Handling
- Handle common errors gracefully (e.g., product not found, invalid data, etc.) and return appropriate error messages.

## Documentation
To set up and run the Immutly API, follow these steps:
1. Clone this repository.
2. Install dependencies using `npm install`.
3. Set up a MongoDB database and provide the connection URI in the `.env` file with key MONGODB_URI.
4. Run the server using `npm start`.
5. Access the API at `http://localhost:8554/api/v1/products`.
6. Test the code using `npm test`.

## Testing
Include basic tests to verify that the service works as expected. Use tools like [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) for testing.

## Bonus Features

### 1. Authentication Mechanism
Implement a simple authentication mechanism using the provided authentication token. Include the token in the headers of your requests.

### 2. Filtering Products
Enhance the `GET /api/v1/products` endpoint to support filtering based on product name or price range. Use query parameters like `name` and `minPrice`/`maxPrice` for filtering.

---

Feel free to reach out if you have any questions or need further assistance.
