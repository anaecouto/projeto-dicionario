export interface ISubServiceDTO {
  title: string,
  subServiceKey: string,
  sequence?: number,
  description?: string,
  companies: any[],
}

export interface IServiceRequestDTO {
  title: string;
  serviceKey: string;
  icon: string; 
  sequence: number;
  description: string;
  subServices: ISubServiceDTO[]
}

export interface IServiceResponseDTO {
  title: string;
  serviceKey: string;
  icon?: string; 
  sequence?: number;
  description?: string;
  subServices: ISubServiceDTO[]
}
