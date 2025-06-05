import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    requied: [true, 'Name is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    maxLength: [500, 'Description cannot exceed 500 characters'],
  },

  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['coffee', 'tea', 'food', 'dessert'],
  },
  price: {
    type: Number,
  },
  sizes: [
    {
      name: {
        type: String,
        enum: ['small', 'medium', 'large', 'extra-large'],
        required: true,
      },
      price: {
        type: Number,
        requied: true,
        min: 0,
      },
    },
  ],

  image: {
    type: String,
    default: null,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});
