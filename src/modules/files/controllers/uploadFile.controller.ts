import {
  Body,
  Controller,
  Inject,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import {
  FileInterceptor,
  FilesInterceptor,
} from "@nestjs/platform-express";
import { ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { BaseController } from "src/shared/core/BaseController";
import S3StorageProvider from "src/shared/providers/storageProvider/implementations/S3StorageProvider";
import IStorageProvider from "src/shared/providers/storageProvider/IStorageProvider";
@ApiTags("file")
@Controller("file")
export class UploadFileController extends BaseController {
  constructor(
    @Inject(S3StorageProvider)
    private storageProvider: IStorageProvider
  ) {
    super();
  }

  @Post("single")
  @UseInterceptors(FileInterceptor("file"))
  @ApiExcludeEndpoint()
  async uploadSingle(@UploadedFile() file: Express.Multer.File) {
    try {
      const result = await this.storageProvider.saveSingleFile(file);
    } catch (err) {
      console.log(err);
    }
  }

  @Post("multiple")
  @UseInterceptors(FilesInterceptor("files", 20))
  @ApiExcludeEndpoint()
  async create(@Res() res: Response, @Body() dto: any, @UploadedFiles() files) {
    try {
      const result = await this.storageProvider.saveMultipleFile(files);
      res.send(200);
    } catch (err) {
      console.log(err);
    }
  }
}
