import mongoose from 'mongoose';

//NOTE emebbedd schema
// const ratingSchema = new mongoose.Schema({
//   // product: {
//   //   type: mongoose.Schema.Types.ObjectId,
//   //   ref: 'Product',
//   //   required: true,
//   // },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   },
//   rating: {
//     type: Number,
//     required: true,
//     min: [1, 'Rating must be atleat 1'],
//     max: [5, 'Rating cannot exceed 5'],
//   },
//   comment: {
//     type: String,
//     trim: true,
//     maxLength: [400, 'Cannot exceed 400 characters'],
//   },
// });

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
      
      },
      price: {
        type: Number,
    
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
  rating : [{
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'Rating'
  }]
});

const Product = mongoose.model('Product', productSchema);


export default Product