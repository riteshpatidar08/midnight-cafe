import Product from './../models/product.js';
import Cart from './../models/cart.js';

export const AddToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
  }

  //use userId to find the cart for particular
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [], totalPrice: 0 });
  }

  console.log(cart.items);

  const existingItem = cart.items.find((item) => {
    item.productId === productId;
  });
  console.log(existingItem);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }
};
