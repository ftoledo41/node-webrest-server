import { Router } from "express";
import { TodoRoutes } from "./todos/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    //Routes
    // router.get("/api/todos", (req, res) => todoController.getTodos(req, res));
    //o esto, porqque los argumentos son pasados en la misma cantidad y el mismo orden

    // Especificamos el path
    router.use("/api/todos", TodoRoutes.routes);

    // *** Examples
    // router.use("/api/auth", TodoRoutes.routes);
    // router.use("/api/products", TodoRoutes.routes);
    // router.use("/api/clients", TodoRoutes.routes);
    // router.use("/api/users", TodoRoutes.routes);


    return router;
  }
}
