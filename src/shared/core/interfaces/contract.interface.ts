export class Alternative {
  fullPrice: string;
  times: string;
  individual: string;
  monthTax: string;
  description: string;
}

export interface Option {
  title: string;
  alternatives: Alternative[];
}

export interface IContract {
  agency: string;
  account: string;
  document: string;
  name: string;
  state: string;
  sex?: string;
  birthDate?: Date;
  status?: string;
  phones: string[];
  options?: Option[];
}
