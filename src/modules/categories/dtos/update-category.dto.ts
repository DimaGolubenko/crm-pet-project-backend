import { IsNumber, IsString } from "class-validator";

export class UpdateCategoryDto {
  @IsString()
  title: string;

  @IsNumber()
  limit: number;
}
