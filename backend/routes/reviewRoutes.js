const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all reviews
router.get('/', (req, res) => {
    db.query('SELECT * FROM reviews', (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    });
});

// Add a review
router.post('/', (req, res) => {
    const { name, email, phone, address, review } = req.body;
    const query = 'INSERT INTO reviews (name, email, phone, address, review) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, email, phone, address, review], (err, result) => {
        if (err) throw err;
        res.status(201).json({ message: 'Review added successfully' });
    });
});

// Update a review
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address, review } = req.body;
    const query = 'UPDATE reviews SET name = ?, email = ?, phone = ?, address = ?, review = ? WHERE id = ?';
    db.query(query, [name, email, phone, address, review, id], (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: 'Review updated successfully' });
    });
});

// Delete a review
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM reviews WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: 'Review deleted successfully' });
    });
});

module.exports = router;
