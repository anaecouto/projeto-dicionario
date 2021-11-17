import { Injectable } from "@nestjs/common";
import aws, { S3 } from "aws-sdk";
import { InjectS3 } from "nestjs-s3";
import AppError from "src/shared/core/errors/AppError";
import IStorageProvider from "../IStorageProvider";
import { v4 as uuidv4 } from "uuid";
@Injectable()
class S3StorageProvider implements IStorageProvider {
  constructor(@InjectS3() private readonly s3: S3) {}

  public async saveSingleFile(file: Express.Multer.File): Promise<string> {
    try {
      const uuid = uuidv4()
      const savedFile = await this.s3
        .upload({
          ACL: "bucket-owner-read",
          Bucket: "crediban-files-bucket",
          Key: uuid,
          Body: file.buffer,
        })
        .promise();
      return savedFile.Key;
    } catch (err) {
      console.log(err);
    }
    return "";
  }

  public async deleteFile(file: string): Promise<void> {
  }

  public async saveMultipleFile(
    files: Express.Multer.File[]
  ): Promise<string[] | undefined> {
    if (!files) return;
    const urls = await Promise.all(
      files.map((file) => {
        return this.saveSingleFile(file);
      })
    );
    return urls;
  }

  public async getObject(fileName: string): Promise<S3.Types.GetObjectOutput | undefined> {
    try {
      const params = {
        Bucket: "crediban-files-bucket",
        Key: fileName 
      }
      const savedFile = await this.s3
        .getObject(params)
        .promise();
      return savedFile
    } catch (err) {
      throw new AppError('Error to get file on S3');
    }
  }
}

export default S3StorageProvider;
