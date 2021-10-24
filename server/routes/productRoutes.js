var express = require('express');
var router = express.Router();
const Customer = require('../models').customer;
const Product = require('../models').product;

router
    .post('/assignProds/:productId', async (req, res) => {
        let product = await Product.findOne({
            where: {
                id: req.params.productId
            }
        });
        const customers = await Customer.findAll();
        var result = await product.addCustomers(customers);
        res.send(result);
    })
    .get('/getOne/:productId', async (req, res) => {
        let product = await Product.findOne({
            where: {
                id: req.params.productId
            }
        });
        res.send(product);
    })
    .get('/getAll', async (req, res) => {
        let products = await Product.findAll();
        res.send(products);
    })

module.exports = router;