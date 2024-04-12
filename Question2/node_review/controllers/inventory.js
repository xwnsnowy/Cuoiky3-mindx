import Inventory from "../models/Inventory.js";

export const getProducts = async (req, res, next) => {
  try {
    const data = await Inventory.find({});
    if (data) {
      return res.status(201).json({
        message: "Get products successfully",
        data,
      });
    }
    return res.status(500).json({
      message: "Get products failed",
    });
  } catch (error) {
    next(error);
  }
};

export const getProductsLower = async (req, res, next) => {
  try {
    const data = await Inventory.find({ instock: { $lt: 100 } });
    if (data) {
      return res.status(200).json({
        message: "Get products successfully",
        data,
      });
    }
    return res.status(500).json({
      message: "Failed to get products",
    });
  } catch (error) {
    next(error);
  }
};
