import { Router } from "express";

import { checkPermission } from "../middlewares/checkPermission.js";
import { getProducts, getProductsLower } from "../controllers/inventory.js";

const inventoryRouter = Router();

inventoryRouter.use(checkPermission);
inventoryRouter.get("/", getProducts);
inventoryRouter.get("/products-lower", getProductsLower);

export default inventoryRouter;
