const { Product } = require('../models/models')
const ApiError = require('../error/ApiError');


class ProductController {

  //Create product

  async create(req, res, next) {
    try {
      const { name, desc, type, brand, price } = req.body
      const userId = req.user.id;
      const product = await Product.create({ name, desc, type, brand, price, userId });
      return res.json({ product })
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  //Get all products

  async getAll(req, res) {
    try {
      const { type } = req.query;
      let products;
      if (!type) {
        products = await Product.findAndCountAll({
          where: { userId: req.user.id }
        });
      }
      if (type) {
        products = await Product.findAndCountAll({
          where: { type, userId: req.user.id }
        });
      }
      return res.json(products);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  //Get product

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({
        where: { id, userId: req.user.id },
      });
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      } else {
        return res.json({ product });
      }
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }

  //Update product

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const product = await Product.findOne({
        where: { id, userId: req.user.id },
      });
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      await product.update({ name });
      return res.json({ product });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }

  //Delete product

  async delete(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({
        where: { id, userId: req.user.id },
      });
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      await product.destroy();
      return res.json("Product has been deleted...");
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }
}


module.exports = new ProductController()