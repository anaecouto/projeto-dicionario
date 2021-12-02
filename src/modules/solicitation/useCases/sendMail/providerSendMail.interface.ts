import { Solicitation } from "../../domain/solicitation/Solicitation";

export interface IProviderSendMail {
  sendMail(solicitation: Solicitation): Promise<any>;
}
