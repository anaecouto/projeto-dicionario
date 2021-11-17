import { Inject, Injectable } from "@nestjs/common";
import AppError from "src/shared/core/errors/AppError";
import { Solicitation } from "../../domain/solicitation/Solicitation";
import { IBaseProvider } from "../../providers/baseProvider.interface";
import { BaseProvider } from "../../providers/implementation/base.provider";
import { ISolicitationProvider } from "../../providers/solicitation.provider";
import { SolicitationRepoTypeOrm } from "../../repositories/implementations/solicitationRepoTypeOrm";
import { ISolicitationRepo } from "../../repositories/solicitationRepo.interface";

@Injectable()
export class SendSolicitationToProviderUseCase {
  constructor(
    @Inject(SolicitationRepoTypeOrm)
    private solicitationRepo: ISolicitationRepo,
    @Inject(BaseProvider)
    private baseProvider: IBaseProvider,
  ) {}

  async execute(request: Solicitation, files?: Express.Multer.File[]): Promise<Solicitation> {
    const provider = await this.chooseProvider(request.companyKey);
    if (provider) {
      console.log("Encontrou provider!!!!");
      const result: any = await provider.sendSolicitation(
        request.companyKey,
        request,
        files
      );
      return request;
    }

    throw new AppError('Não foi possível encontrar um provider para a chave: ', request.companyKey);
  }

  private async chooseProvider(
    companyKey: string
  ): Promise<ISolicitationProvider | undefined> {
    const provider = this.baseProvider.chooseProvider(companyKey);
    if (!provider) {
      console.log(
        "Não existe uma implementação de prider para a key: ",
        companyKey
      );
    }
    return provider;
  }
}
