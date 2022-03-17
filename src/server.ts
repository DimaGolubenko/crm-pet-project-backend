import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({
  path: path.resolve(__dirname, `../${process.env.NODE_ENV}.env`),
});

import { App } from "./app";
import { CategoryController } from "./modules/categories/category.controller";

const app = new App([new CategoryController()]);

app.listen();
