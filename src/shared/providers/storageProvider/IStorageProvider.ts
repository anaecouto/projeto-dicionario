import { S3 } from "aws-sdk";
export default interface IStorageProvider {
  saveSingleFile(file: Express.Multer.File): Promise<string>;
  saveMultipleFile(file: Express.Multer.File[]): Promise<string[] | undefined>;
  deleteFile(file: any): Promise<void>;
  getObject(fileName: string): Promise<S3.Types.GetObjectOutput | undefined>;
}
