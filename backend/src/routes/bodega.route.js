import express from "express";
import BodegaController from "../controllers/bodega.controller.js";
import { bodegaSchema } from '../validations/bodega.validation.js';
import { validate } from '../middlewares/validate.js';

const bodegaRouter = ({ BodegaModel }) => {
  const router = express.Router();
  const bodegaController = new BodegaController(BodegaModel);

  router.post("/", validate(bodegaSchema), bodegaController.createBodega.bind(bodegaController));
  router.get("/", bodegaController.getBodegas.bind(bodegaController));
  router.get("/:id", bodegaController.getBodegaById.bind(bodegaController));
  router.put("/:id", bodegaController.updateBodega.bind(bodegaController));
  router.delete("/:id", bodegaController.deleteBodega.bind(bodegaController));

  return router;
};

export default bodegaRouter;