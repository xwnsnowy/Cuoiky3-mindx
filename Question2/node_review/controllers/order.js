import Order from "../models/Order.js";
import Inventory from "../models/Inventory.js";

export const getOrder = async (req, res, next) => {
  try {
    const orders = await Order.find();

    if (orders.length > 0) {
      const populatedOrders = await Promise.all(
        orders.map(async (order) => {
          const inventoryItem = await Inventory.findOne({ sku: order.item });
          return {
            ...order.toObject(),
            item: inventoryItem.sku,
            description: inventoryItem.description,
          };
        })
      );

      return res.status(200).json({
        message: "Orders with product descriptions retrieved successfully",
        data: populatedOrders,
      });
    }

    return res.status(404).json({
      message: "No orders found",
    });
  } catch (error) {
    next(error);
  }
};
