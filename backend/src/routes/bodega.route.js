import express from "express";
import BodegaController from "../controllers/bodega.controller.js";

const bodegaRouter = ({ BodegaModel }) => {
  const router = express.Router();
  const bodegaController = new BodegaController(BodegaModel);

  router.post("/", bodegaController.createBodega.bind(bodegaController));
  router.get("/", bodegaController.getBodegas.bind(bodegaController));
  router.get("/:id", bodegaController.getBodegaById.bind(bodegaController));
  router.put("/:id", bodegaController.updateBodega.bind(bodegaController));
  router.delete("/:id", bodegaController.deleteBodega.bind(bodegaController));

  return router;
};

export default bodegaRouter;