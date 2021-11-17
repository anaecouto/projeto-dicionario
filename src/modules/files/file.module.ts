import { Module } from '@nestjs/common';
import { S3Module } from 'nestjs-s3';
import S3StorageProvider from 'src/shared/providers/storageProvider/implementations/S3StorageProvider';
import { SharedModule } from 'src/shared/shared.module';
import { UploadFileController } from './controllers/uploadFile.controller';

@Module({
  imports: [
    SharedModule,
    S3Module.forRoot({
      config: {
        accessKeyId: 'AKIAXI256AE2VOPHZBLX',
        secretAccessKey: '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',
        s3ForcePathStyle: true,
        region: 'us-east-1',
      },
    }),
  ],
  controllers: [UploadFileController],
  providers: [S3StorageProvider],
})
export class FilesModule {}
