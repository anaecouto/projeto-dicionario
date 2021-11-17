import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ISubService } from 'src/shared/core/interfaces/subService.interface';
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './_baseEntity';

@Entity('services')
export class ServiceEntity extends BaseEntity {

  @Column()
  title: string;
  
  @Column()
  @IsString()
  @IsNotEmpty()
  @Index({ unique: true })
  serviceKey: string;
  
  @Column()
  @IsString()
  @IsOptional()
  icon?: string; 
  
  @Column()
  @IsOptional()
  sequence?: number;
  
  @Column()
  @IsString()
  @IsOptional()
  description?: string;
  
  @Column()
  subServices: ISubService[];
  
}
