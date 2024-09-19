const express = require('express');
const Product = require('../schemas/product.schema');
const auth = require('../middleware/auth');
const router = express.Router();

// Create
router.post('/', auth, async (req, res, next) => {
    const { name, price, description } = req.body;
    try {
        const newProduct = new Product({ name, price, description });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
});

// Read all
router.get('/', async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

// Read
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

// Update
router.put('/:id', auth, async (req, res, next) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id, { name, price, description }, { new: true, runValidators: true }
        );
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
});

// Delete
router.delete('/:id', auth,  async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
