import { IAddress } from "./address.interface";
import { ICredentials } from "./credentials.interface";
import { ISubCategory } from "./subCategory.interface";

export interface ICategory {
  title: string,
  key: string,
  icon: string, 
  sequence: number,
  subCategories?: ISubCategory[];
}
