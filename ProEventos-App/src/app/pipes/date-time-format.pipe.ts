import { Constants } from './../util/constants';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DateFormatPipe'
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return super.transform(value, Constants.DATE_TIME_FMT);
  }

}
