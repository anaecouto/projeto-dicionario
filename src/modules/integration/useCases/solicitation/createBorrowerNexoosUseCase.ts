import { Inject, Injectable } from '@nestjs/common';
import AppError from 'src/shared/core/errors/AppError';
import { NexoosProvider } from '../../providers/implementation/nexoos.provider';
import { ICompanyRepo } from '../../repositories/companyRepo.interface';
import { CompanyRepoTypeOrm } from '../../repositories/implementations/companyRepoTypeOrm';

@Injectable()
export class CreateBorrowerNexoosUseCase {

    constructor(
    @Inject(NexoosProvider)
    private nexoos: NexoosProvider,
    @Inject(CompanyRepoTypeOrm)
    private companyRepo: ICompanyRepo) {

    }

    async createBorrower(borrower: INexoosBorrowerRequest): Promise<any> {
        let company = await this.companyRepo.findByCompanyKey('nexoos');
        
        if(!company){
            throw new AppError('Empresa Nexoos não cadastrada!');
        }

        console.log('---------------->ANTES DO CREATE BORROWER!!!');
        return this.nexoos.borrowers(borrower, company);
    }
}