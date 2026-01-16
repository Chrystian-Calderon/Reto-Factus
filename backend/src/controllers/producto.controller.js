import { nanoid } from 'nanoid';
import { throwCustomError } from "../utils/error.util.js";

class ProductoController {
  constructor(model) {
    this.model = model;
  }

  async createProducto(req, res, next) {
    const { name, description, stock_min } = req.body;
    try {
      const barcode = nanoid(12);
      const newProducto = await this.model.create([name, barcode, description, stock_min]);
      res.status(201).json({ success: true, producto: newProducto });
    } catch (error) {
      next(throwCustomError('Error al crear el producto', 500, error));
    }
  }

  async getProductos(req, res, next) {
    const { page = 1, limit = 10, search = '' } = req.query;
    try {
      const productosData = await this.model.getAll({ page: parseInt(page, 10), limit: parseInt(limit, 10), search });
      res.json({ success: true, ...productosData });
    } catch (error) {
      next(throwCustomError('Error al obtener los productos', 500, error));
    }
  }

  async getProductoById(req, res, next) {
    const { id } = req.params;
    try {
      const producto = await this.model.getById(id);
      if (!producto) {
        return next(throwCustomError('Producto no encontrado', 404));
      }
      res.json({ success: true, producto });
    } catch (error) {
      next(throwCustomError('Error al obtener el producto', 500, error));
    }
  }

  async updateProducto(req, res, next) {
    const { id } = req.params;
    const { name, description, stock_min } = req.body;
    try {
      const updatedProducto = await this.model.update(id, [name, description, stock_min]);
      res.json({ success: true, producto: updatedProducto });
    } catch (error) {
      next(throwCustomError('Error al actualizar el producto', 500, error));
    }
  }

  async deleteProducto(req, res, next) {
    const { id } = req.params;
    try {
      await this.model.delete(id);
      res.json({ success: true, message: 'Producto eliminado correctamente' });
    } catch (error) {
      next(throwCustomError('Error al eliminar el producto', 500, error));
    }
  }
}

export default ProductoController;
