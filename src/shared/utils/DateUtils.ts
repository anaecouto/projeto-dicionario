import * as moment from 'moment';

export class DateUtils {

  static addSeconds = (date: Date, seconds: number): Date => {
    return moment(date)
      .add(seconds, 'seconds')
      .toDate();
  };

  static addMinutes = (date: Date, minutes: number): Date => {
    return moment(date)
      .add(minutes, 'minutes')
      .toDate();
  };

  static addHours = (date: Date, hours: number): Date => {
    return moment(date)
      .add(hours, 'hours')
      .toDate();
  };

  static addDays = (date: Date, days: number): Date => {
    return moment(date)
      .add(days, 'days')
      .toDate();
  };

  static addMonths = (date: Date, days: number): Date => {
    return moment(date)
      .add(days, 'months')
      .toDate();
  };

  static addYears = (date: Date, days: number): Date => {
    return moment(date)
      .add(days, 'years')
      .toDate();
  };

  static subtractDays = (date: Date, days: number): Date => {
    return moment(date)
      .subtract(days, 'days')
      .toDate();
  };

  static subtractMonths = (date: Date, days: number): Date => {
    return moment(date)
      .subtract(days, 'months')
      .toDate();
  };

  static subtractYears = (date: Date, days: number): Date => {
    return moment(date)
      .subtract(days, 'years')
      .toDate();
  };

  static subtractHours = (date: Date, hours: number): Date => {
    return moment(date)
      .subtract(hours, 'hours')
      .toDate();
  };

  static lastMinuteOfTheDay = (date: Date): Date => {
    return moment(date)
      .hours(23)
      .minutes(59)
      .seconds(59)
      .milliseconds(599)
      .toDate();
  };

  static firstMinuteOfTheDay = (date: Date): Date => {
    return moment(date)
      .hours(0)
      .minutes(0)
      .seconds(0)
      .milliseconds(0)
      .toDate();
  };

  static diffDays = (date: Date, otherDate: Date): number => {
    return moment(date).diff(otherDate, 'days');
  };

  /**
   * @param diff - value: days, hours or years
   */
  static diff = (date: Date, otherDate: Date, diff: any): number => {
    return moment(date).diff(otherDate, diff);
  };

  /**
   * @param date - value: date to be formated
   * @param pattern - value: target pattern
   */
  static stringFormat = (date: Date, pattern: string): string => {
    return moment(date).format(pattern);
  };

  /**
   * @param date - value: date to be formated... this date should be in format YYYY-MM-DD
   * if the date can't be parsed, this method will return undefined
   */
   static convertStringToDate = (date: string): Date | undefined => {
    // 2021-10-14T13:55:00.270+00:00
    try {
      const dateParsed = moment(date, 'YYYY-MM-DD HH:mm:ss', true);
      if (dateParsed.isValid()) {
        return dateParsed.toDate();
      }
    }catch(err) {
      console.log('deu ruim');
      // se não conseguiu converter é pq não é data
    }
  };
}
