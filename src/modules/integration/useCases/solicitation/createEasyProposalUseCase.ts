import { Inject, Injectable } from '@nestjs/common';
import { IProposalEasy } from 'src/shared/core/interfaces/easycreditoProposal.interface';
import { EasyCreditoProvider } from '../../providers/implementation/easyCredito.provider';
import { ICompanyRepo } from '../../repositories/companyRepo.interface';
import { CompanyRepoTypeOrm } from '../../repositories/implementations/companyRepoTypeOrm';

@Injectable()
export class CreateEasyProposalUseCase {

    constructor(
    @Inject(EasyCreditoProvider)
    private easyCredito: EasyCreditoProvider,
    @Inject(CompanyRepoTypeOrm)
    private companyRepo: ICompanyRepo) {

    }

    async createProposal(proposalEasy: IProposalEasy): Promise<any> {
        
        let company = await this.companyRepo.findByCompanyKey('easyCredito');
        
        if(!company){
            console.log('Empresa Easy não cadastrada!');
            return null;
        }

        console.log('---------------->ANTES DO CREATE PROPOSAL!!!');
        return this.easyCredito.createProposal(proposalEasy, company);
    }
}