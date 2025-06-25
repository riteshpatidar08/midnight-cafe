import Order from '../models/order';

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    if (!order) {
      res.status(400).json({
        message: 'Order not placed',
      });
    }
    res.status(200).json({
      message: 'Your order is successfully placed',
    });
  } catch (error) {}
};

export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      return res.status(404).json({
        message: 'No order found',
      });
    }

    res.status(200).json({
      message: 'success',
      data: orders,
    });
  } catch (error) {}
};

export const getOrderByUserID = async (req, res) => {
  try {
    const { userId } = req.params;
    const order = await Order.findById(userId);
    if (!orders) {
      return res.status(404).json({
        message: 'No order found',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'error',
      data: error,
    });
  }
};


// =>  delete order by id =>