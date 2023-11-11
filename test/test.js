const chai = require('chai');
const supertest = require('supertest');
const app = require('../app');
const Product = require('../src/models/productModel');

const expect = chai.expect;
const request = supertest(app);

describe('Product API', () => {
  // Removing all the existing products
  beforeEach(async () => {
    await Product.deleteMany({});
  });

  describe('GET /api/v1/products', () => {
    it('should get all products', async () => {
      await Product.create({
        prodId: '1',
        productName: 'Test Product',
        productDescription: 'Description',
        price: 19.99,
        availabilityStatus: true,
      });

      const response = await request
        .get('/api/v1/products')
        .set('Authorization', 'ICanOnlyLogin');
      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal('success');
      expect(response.body.data).to.be.an('array');
      expect(response.body.data).to.have.lengthOf(1);
    });

    it('should filter products by name', async () => {
      await Product.create([
        {
          prodId: '1',
          productName: 'Test Product 1',
          productDescription: 'Description',
          price: 19.99,
          availabilityStatus: true,
        },
        {
          prodId: '2',
          productName: 'Test Product 2',
          productDescription: 'Description',
          price: 29.99,
          availabilityStatus: true,
        },
      ]);

      const response = await request
        .get('/api/v1/products?name=Test Product 1')
        .set('Authorization', 'ICanOnlyLogin');
      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal('success');
      expect(response.body.data).to.be.an('array');
      expect(response.body.data).to.have.lengthOf(1);
      expect(response.body.data[0].productName).to.equal('Test Product 1');
    });

    it('should filter products by price range', async () => {
      await Product.create([
        {
          prodId: '1',
          productName: 'Test Product 1',
          productDescription: 'Description',
          price: 19.99,
          availabilityStatus: true,
        },
        {
          prodId: '2',
          productName: 'Test Product 2',
          productDescription: 'Description',
          price: 29.99,
          availabilityStatus: true,
        },
      ]);

      const response = await request
        .get('/api/v1/products?minPrice=20&maxPrice=30')
        .set('Authorization', 'ICanOnlyLogin');
      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal('success');
      expect(response.body.data).to.be.an('array');
      expect(response.body.data).to.have.lengthOf(1);
      expect(response.body.data[0].productName).to.equal('Test Product 2');
    });
  });

  describe('GET /api/v1/products/:prodId', () => {
    it('should get a product by prodId', async () => {
      const product = await Product.create({
        prodId: '1',
        productName: 'Test Product',
        productDescription: 'Description',
        price: 19.99,
        availabilityStatus: true,
      });

      const response = await request
        .get(`/api/v1/products/${product.prodId}`)
        .set('Authorization', 'ICanOnlyLogin');
      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal('success');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data.prodId).to.equal(product.prodId);
    });

    it('should return 404 if product with prodId is not found', async () => {
      const response = await request
        .get('/api/v1/products/nonexistent')
        .set('Authorization', 'ICanOnlyLogin');
      expect(response.status).to.equal(404);
      expect(response.body.status).to.equal('error');
      expect(response.body.message).to.equal('Product not found');
    });
  });

  describe('POST /api/v1/products', () => {
    it('should create a new product', async () => {
      const newProduct = {
        productName: 'New Product',
        productDescription: 'New Description',
        price: 29.99,
        availabilityStatus: true,
      };

      const response = await request
        .post('/api/v1/products')
        .set('Authorization', 'ICanOnlyLogin')
        .send(newProduct);
      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal('success');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data.productName).to.equal(newProduct.productName);
    });

    it('should return 400 for a bad request', async () => {
      const response = await request
        .post('/api/v1/products')
        .set('Authorization', 'ICanOnlyLogin')
        .send({});
      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal('error');
      expect(response.body.message).to.equal('Bad Request');
    });
  });

  describe('PUT /api/v1/products/:prodId', () => {
    it('should update a product by prodId', async () => {
      const product = await Product.create({
        prodId: '1',
        productName: 'Test Product',
        productDescription: 'Description',
        price: 19.99,
        availabilityStatus: true,
      });

      const updatedProduct = {
        productName: 'Updated Product',
        productDescription: 'Updated Description',
        price: 39.99,
        availabilityStatus: false,
      };

      const response = await request
        .put(`/api/v1/products/${product.prodId}`)
        .set('Authorization', 'ICanOnlyLogin')
        .send(updatedProduct);

      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal('success');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data.productName).to.equal(updatedProduct.productName);
      expect(response.body.data.availabilityStatus).to.equal(updatedProduct.availabilityStatus);
    });

    it('should return 404 if product with prodId is not found', async () => {
      const response = await request
        .put('/api/v1/products/nonexistent')
        .set('Authorization', 'ICanOnlyLogin')
        .send({});
      expect(response.status).to.equal(404);
      expect(response.body.status).to.equal('error');
      expect(response.body.message).to.equal('Product not found');
    });
  });

  describe('DELETE /api/v1/products/:prodId', () => {
    it('should delete a product by prodId', async () => {
      const product = await Product.create({
        prodId: '1',
        productName: 'Test Product',
        productDescription: 'Description',
        price: 19.99,
        availabilityStatus: true,
      });

      const response = await request
        .delete(`/api/v1/products/${product.prodId}`)
        .set('Authorization', 'ICanOnlyLogin');
      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal('success');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data.prodId).to.equal(product.prodId);
    });

    it('should return 404 if product with prodId is not found', async () => {
      const response = await request
        .delete('/api/v1/products/nonexistent')
        .set('Authorization', 'ICanOnlyLogin');
      expect(response.status).to.equal(404);
      expect(response.body.status).to.equal('error');
      expect(response.body.message).to.equal('Product not found');
    });
  });
});

