import expres from 'express';
import ProductoController from '../controllers/producto.controller.js';

const productoRouter = ({ ProductoModel }) => {
  const router = expres.Router();
  const productoController = new ProductoController(ProductoModel);

  router.post('/', productoController.createProducto.bind(productoController));
  router.get('/', productoController.getProductos.bind(productoController));
  router.get('/:id', productoController.getProductoById.bind(productoController));
  router.put('/:id', productoController.updateProducto.bind(productoController));
  router.delete('/:id', productoController.deleteProducto.bind(productoController));

  return router;
};

export default productoRouter;