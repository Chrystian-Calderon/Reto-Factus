import { throwCustomError } from "../utils/error.util.js";

class BodegaController {
  constructor(model) {
    this.model = model;
  }

  async createBodega(req, res) {
    const { name, location } = req.body;
    try {
      const newBodega = await this.model.create([name, location]);
      res.status(201).json({ success: true, bodega: newBodega });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear la bodega', error: error.message });
    }
  }

  async getBodegas(req, res) {
    const { page = 1, limit = 10, search = '' } = req.query;
    try {
      const bodegasData = await this.model.getAll({ page: parseInt(page, 10), limit: parseInt(limit, 10), search });
      res.json({ success: true, ...bodegasData });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener las bodegas', error: error.message });
    }
  }

  async getBodegaById(req, res) {
    const { id } = req.params;
    try {
      const bodega = await this.model.getById(id);
      if (!bodega) {
        return res.status(404).json({ success: false, message: 'Bodega no encontrada' });
      }
      res.json({ success: true, bodega });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener la bodega', error: error.message });
    }
  }

  async updateBodega(req, res) {
    const { id } = req.params;
    const { name, location } = req.body;
    try {
      const updatedBodega = await this.model.update(id, [name, location]);
      res.json({ success: true, bodega: updatedBodega });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar la bodega', error: error.message });
    }
  }

  async deleteBodega(req, res) {
    const { id } = req.params;
    try {
      await this.model.delete(id);
      res.json({ success: true, message: 'Bodega eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar la bodega', error: error.message });
    }
  }
}

export default BodegaController;