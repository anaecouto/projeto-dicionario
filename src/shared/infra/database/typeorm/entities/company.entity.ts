import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { ICredentials } from 'src/shared/core/interfaces/credentials.interface';
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './_baseEntity';

@Entity('companies')
export class CompanyEntity extends BaseEntity {

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Index({ unique: true })
  key: string;

  @Column()
  @IsOptional()
  siteUrl: string;

  @Column()
  @IsString()
  @IsOptional()
  credentials: ICredentials;

  @Column()
  @IsObject()
  @IsOptional()
  metadata: any;

  
}
