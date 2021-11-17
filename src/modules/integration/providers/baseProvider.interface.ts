import { ISolicitationProvider } from "./solicitation.provider";

export interface IBaseProvider {
  chooseProvider(
    companyKey: string,
  ): ISolicitationProvider | undefined;
}
