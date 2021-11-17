import { Inject, Injectable } from "@nestjs/common";
import { SolicitationStatusEnum } from "src/shared/core/enums/solicitationStatus.enum";
import S3StorageProvider from "src/shared/providers/storageProvider/implementations/S3StorageProvider";
import IStorageProvider from "src/shared/providers/storageProvider/IStorageProvider";
import { Solicitation } from "../../domain/solicitation/Solicitation";
import { ICompanyRepo } from "../../repositories/companyRepo.interface";
import { CompanyRepoTypeOrm } from "../../repositories/implementations/companyRepoTypeOrm";
import { SolicitationRepoTypeOrm } from "../../repositories/implementations/solicitationRepoTypeOrm";
import { ISolicitationRepo } from "../../repositories/solicitationRepo.interface";
import { ISolicitationProvider } from "../solicitation.provider";

@Injectable()
export class MultiplikeProvider implements ISolicitationProvider {
  constructor(
    @Inject(CompanyRepoTypeOrm)
    private companyRepo: ICompanyRepo,
    @Inject(SolicitationRepoTypeOrm)
    private solicitationRepo: ISolicitationRepo,
    @Inject(S3StorageProvider)
    private storageProvider: IStorageProvider
  ) {}

  async sendSolicitation(
    companyKey: string,
    solicitation: Solicitation,
    files: Express.Multer.File[]
  ): Promise<any> {
    const fileUrls = await this.storageProvider.saveMultipleFile(files);
    solicitation.metadata = { ...solicitation.metadata, fileUrls };
    solicitation.setStatus(SolicitationStatusEnum.PENDING);
    this.solicitationRepo.save(solicitation);
  }
}
