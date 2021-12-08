import * as moment from 'moment';

export class PhoneUtils {

  static foundWhatsappPhone = (phones: string[]): string[] => {
    if(phones && phones.length > 0) {
      return phones.filter(element => element[2] === '9')
    }
    return [];
  };
}