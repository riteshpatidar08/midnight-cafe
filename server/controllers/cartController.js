import Product from './../models/product.js';
import Cart from './../models/cart.js';

export const AddToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  const product = await Product.findById(productId);
  console.log(product);
  if (!product) {
  }
  //use userId to find the cart for particular
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [], totalPrice: 0 });
  }
  console.log('cart', cart);
  console.log('cart item', cart.items);

  const existingItem = cart.items.find((item) => {
    // console.log('loop' , item)
    // console.log(item.productId.toString() === productId)
    return item.productId.toString() === productId;
  });
  console.log('existingItem', existingItem);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  console.log(cart.items);
  cart.totalPrice = cart.items.reduce((acc, item) => {
    return acc + item.quantity * product.price;
  }, 0);

  await cart.save();

  res.status(200).json({
    message: 'item added to cart',
  });
};

//getcart
export const getCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    const totalCartItems = cart.items.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    res.status(200).json({
      cart,
      totalCartItems,
    });
  } catch (error) {}
};

//NOTE removeItemFromCart => productId , cart.items and calculate price once again
//NOTE clearCart => userId and findByidAndDelete
//NOTE increaseQuantity => cart.items.quantity +1 , calculate totalprice
//NOTE descreaseQuantity => cart.items.quantity -1 , calculate price
