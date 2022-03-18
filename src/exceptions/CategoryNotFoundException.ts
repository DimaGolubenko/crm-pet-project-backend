import { HttpException } from "./HttpException";

export class CategoryNotFoundException extends HttpException {
  constructor(categoryId: string) {
    super(404, `Category with id "${categoryId}" not found`);
  }
}
