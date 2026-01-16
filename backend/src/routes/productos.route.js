import expres from 'express';
import ProductoController from '../controllers/producto.controller.js';
import { productoSchema } from '../validations/producto.validation.js';
import { validate } from '../middlewares/validate.js';

const productoRouter = ({ ProductoModel }) => {
  const router = expres.Router();
  const productoController = new ProductoController(ProductoModel);

  router.post('/', validate(productoSchema), productoController.createProducto.bind(productoController));
  router.get('/', productoController.getProductos.bind(productoController));
  router.get('/:id', productoController.getProductoById.bind(productoController));
  router.put('/:id', productoController.updateProducto.bind(productoController));
  router.delete('/:id', productoController.deleteProducto.bind(productoController));

  return router;
};

export default productoRouter;