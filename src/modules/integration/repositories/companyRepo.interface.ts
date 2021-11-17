import { Company } from "../domain/company/Company";

export interface ICompanyRepo {
  save(company: Company): Promise<Company>;
  findAll(): Promise<Company[]>;
  findById(id: string): Promise<Company>;
  findByCompanyKey(companyKey: string): Promise<Company | undefined>;
}
