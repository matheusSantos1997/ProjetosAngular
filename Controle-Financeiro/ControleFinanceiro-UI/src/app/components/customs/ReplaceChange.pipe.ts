import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ReplaceChange'
})
export class ReplaceChangePipe implements PipeTransform {

  transform(value: string): any {
     return value.replace('.', ',');
  }

}
