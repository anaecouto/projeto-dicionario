import BaseProviderError from "./BaseProviderError";

export interface ErrorProps {
  status: number;
  errors: string[];
}

export default class EasyCreditoProviderError extends BaseProviderError {
  constructor(exception: any = {}, data: any = {}) {
    super(exception);
    if(exception.response) {
      try { 
        this.data.statusCode = exception.response.status || 400;
        this.data.message = this.data.message.concat(this.buildErros(exception.response.data))
        this.data.error = exception?.response?.data?.code || 'Easy Credito Provider Error!';
      } catch(err) {
        console.log(err);
      }
    } else {
      this.data.statusCode = 400;
      this.data.message = exception;
      this.data.error = 'Easy Credito Provider Error!';
    }
  }

  private buildErros(data: any): string[] {
    let result: string[] = [];
    if(data?.errors) {
      const errors = data.errors;
      errors.map((error) => {
        result.push(error.message)
      })
    } else {
      result.push('Easy Credito Provider Error!')
    }
      return result;
  }
}
