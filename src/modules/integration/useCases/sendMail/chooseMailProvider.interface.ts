import { Solicitation } from "../../domain/solicitation/Solicitation";
import { IProviderSendMail } from "./providerSendMail.interface";

export default interface IChooseMailProvider {
  chooseProviderToSendMail(solicitation: Solicitation): Promise<IProviderSendMail>;
}
