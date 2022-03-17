import * as mongoose from "mongoose";
import { CategoryInterface } from "./category.interface";

const categorySchema = new mongoose.Schema({
  title: String,
  limit: Number,
});

export const categoryModel = mongoose.model<
  CategoryInterface & mongoose.Document
>("categories", categorySchema);
