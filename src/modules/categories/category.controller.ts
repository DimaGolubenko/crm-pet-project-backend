import * as express from "express";

import { categoryModel } from "./category.model";
import { ControllerInterface } from "controller.interface";
import { CategoryInterface } from "./category.interface";

export class CategoryController implements ControllerInterface {
  public path = "/categories";
  public router = express.Router();

  constructor() {
    this.initilizeRoutes();
  }

  private initilizeRoutes() {
    this.router.get(this.path, this.getAllCategories);
    this.router.post(this.path, this.createCategory);
  }

  private async getAllCategories(
    request: express.Request,
    response: express.Response
  ) {
    const categories = await categoryModel.find({});
    response.json({ categories });
  }

  private async createCategory(
    request: express.Request,
    response: express.Response
  ) {
    const categoryData: CategoryInterface = request.body;
    const newCategory = await categoryModel.create(categoryData);
    response.json({ data: newCategory });
  }
}
