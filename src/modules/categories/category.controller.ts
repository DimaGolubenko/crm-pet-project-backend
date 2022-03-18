import * as express from "express";

import { categoryModel } from "./category.model";
import { ControllerInterface } from "controller.interface";
import { CategoryInterface } from "./category.interface";
import { HttpException } from "../../exceptions/HttpException";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { CreateCategoryDto } from "./dtos/create-category.dto";
import { UpdateCategoryDto } from "./dtos/update-category.dto";

export class CategoryController implements ControllerInterface {
  public path = "/categories";
  public router = express.Router();

  constructor() {
    this.initilizeRoutes();
  }

  private initilizeRoutes() {
    this.router.get(this.path, this.getAllCategories);
    this.router.get(`${this.path}/:id`, this.getCategoryById);
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(UpdateCategoryDto),
      this.updateCategory
    );
    this.router.post(
      this.path,
      validationMiddleware(CreateCategoryDto),
      this.createCategory
    );
    this.router.delete(`${this.path}/:id`, this.deleteCategory);
  }

  private async getAllCategories(
    request: express.Request,
    response: express.Response
  ) {
    const categories = await categoryModel.find({});
    response.json({ data: categories });
  }

  private async getCategoryById(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    const categoryId = request.params.id;
    const successResponse = await categoryModel.findById(categoryId);
    if (successResponse) {
      response.json({ data: successResponse });
    } else {
      next(
        new HttpException(404, `Category with id "${categoryId}" not found`)
      );
    }
  }

  private async createCategory(
    request: express.Request,
    response: express.Response
  ) {
    const categoryData: CategoryInterface = request.body;
    const newCategory = await categoryModel.create(categoryData);
    response.status(201).json({ data: newCategory });
  }

  private async updateCategory(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    const categoryId = request.params.id;
    const categoryData: CategoryInterface = request.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      categoryId,
      categoryData,
      { new: true }
    );
    if (updatedCategory) {
      response.json({ data: updatedCategory });
    } else {
      next(
        new HttpException(404, `Category with id "${categoryId}" not found`)
      );
    }
  }

  private async deleteCategory(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    const categoryId = request.params.id;
    const successResponse = await categoryModel.findByIdAndDelete(categoryId);
    if (successResponse) {
      response.send(204);
    } else {
      next(
        new HttpException(404, `Category with id "${categoryId}" not found`)
      );
    }
  }
}
