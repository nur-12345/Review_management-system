import React, { useState, useEffect } from 'react';
import './ReviewForm.css';


const ReviewForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        review: ''
    });

    const [reviews, setReviews] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission for adding or updating a review
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editMode
                ? `http://localhost:5000/api/reviews/${editId}`
                : 'http://localhost:5000/api/reviews';
            const method = editMode ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            alert(data.message);

            // Reset form and state after submission
            setFormData({ name: '', email: '', phone: '', address: '', review: '' });
            setEditMode(false);
            setEditId(null);
            fetchReviews();
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch all reviews from the backend
    const fetchReviews = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/reviews');
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.error(error);
        }
    };

    // Set the selected review in the form for editing
    const handleEdit = (review) => {
        setFormData({
            name: review.name,
            email: review.email,
            phone: review.phone,
            address: review.address,
            review: review.review
        });
        setEditMode(true);
        setEditId(review.id);
    };

    // Delete a review by ID
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/reviews/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            alert(data.message);
            fetchReviews();
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch reviews on component mount
    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <div  className="container">
            <h2>{editMode ? 'Edit Review' : 'Submit Review'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="review"
                    placeholder="Review"
                    value={formData.review}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{editMode ? 'Update' : 'Submit'}</button>
            </form>

            <h3>All Reviews</h3>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id}>
                        <strong>{review.name}:</strong> {review.review}
                        <button onClick={() => handleEdit(review)}>Edit</button>
                        <button onClick={() => handleDelete(review.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewForm;
