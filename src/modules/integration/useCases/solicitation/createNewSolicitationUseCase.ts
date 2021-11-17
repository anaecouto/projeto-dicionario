import { Inject, Injectable, Scope } from "@nestjs/common";
import { IUseCase } from "src/shared/core/IUseCase";
import { Address } from "../../domain/solicitation/Address";
import { Person } from "../../domain/solicitation/Person";
import { Solicitation } from "../../domain/solicitation/Solicitation";
import { ICreateNewSolicitationRequestDTO } from "./dto/createNewSolicitationDTO";
import { ISolicitation } from "../../../../shared/core/interfaces/solicitation.interface";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { SolicitationRepoTypeOrm } from "../../repositories/implementations/solicitationRepoTypeOrm";
import { EventEmitter2 } from "eventemitter2";
import { ISetInvolvedSolicitationEvent } from "src/shared/core/interfaces/setInvolvedSolicitationEvent.interface";
import { BaseUseCase } from "src/shared/core/baseUseCase";
import { SolicitationEntity } from "src/shared/infra/database/typeorm/entities/solicitation.entity";
import { isNumber } from "class-validator";
import AppError from "src/shared/core/errors/AppError";

@Injectable({ scope: Scope.REQUEST })
export class CreateNewSolicitationUseCase
  extends BaseUseCase<SolicitationEntity>
  implements IUseCase<ICreateNewSolicitationRequestDTO, ISolicitation>
{
  constructor(
    @Inject(REQUEST) private request: Request,
    @Inject(SolicitationRepoTypeOrm)
    private solicitationRepo: SolicitationRepoTypeOrm,
    private eventEmitter: EventEmitter2   
  ) {
    super(solicitationRepo);
  }

  async execute(dto: ICreateNewSolicitationRequestDTO): Promise<Solicitation> {
    console.log('Entrou');
    console.log(dto);
    const address = Address.create(dto?.person?.address);
    const person = Person.create({
      ...dto?.person,
      address,
      ip: this.request.ip,
      userAgent: this.request?.headers["user-agent"],
    });

    const amount = this.verifyAmountIsValid(dto?.amount);

    let solicitation = Solicitation.create({ ...dto, person, amount });
    solicitation = await this.solicitationRepo.save(solicitation);

    this.verifySolicitationHasInvolved(solicitation);
    return solicitation;
  }

  private verifySolicitationHasInvolved(solicitation: Solicitation) {
    const subestablished = this.request?.headers['subestablished'];
    const seller = this.request?.headers['seller'];
    
    this.eventEmitter.emit('solicitation.setinvolved',
      {
        serviceKey: solicitation.serviceKey,
        subServiceKey: solicitation.subServiceKey,
        companyKey: solicitation.companyKey,
        solicitationId: solicitation.id.toString(),
        subestablished,
        seller
      } as ISetInvolvedSolicitationEvent);
  }

  private verifyAmountIsValid(amount: string): number {
    const amountToNumber = Number(amount);

    if (!isNumber(amountToNumber)) {
      throw new AppError("Amount must be a valid number", { status: 400 })
    }
    return amountToNumber;
  }
}
