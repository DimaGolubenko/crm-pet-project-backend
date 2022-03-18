import { NextFunction, Request, RequestHandler, Response } from "express";
import { validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";

import { HttpException } from "../exceptions/HttpException";

export const validationMiddleware = (
  type: any,
  skipMissingProperties = false
): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const errors: ValidationError[] = await validate(
      plainToInstance(type, req.body),
      { skipMissingProperties }
    );
    if (errors.length > 0) {
      const message = errors
        .map((error: ValidationError) => Object.values(error.constraints))
        .join(", ");
      next(new HttpException(400, message));
    } else {
      next();
    }
  };
};
