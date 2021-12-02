import { Solicitation } from "../domain/solicitation/Solicitation";

export interface ISolicitationProvider {
  sendSolicitation(
    companyKey: string, solicitation: Solicitation,
    files?: Express.Multer.File[]
  ): Promise<any>;
}
