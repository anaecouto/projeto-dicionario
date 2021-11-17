export interface ISubService {
  title: string,
  subServiceKey: string,
  sequence?: number,
  description?: string,
  companies: {
    key: string,
    splitPercentage: number
  }[]
}