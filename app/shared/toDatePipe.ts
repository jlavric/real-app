import {Pipe,PipeTransform} from 'angular2/core';


@Pipe({name: 'toDate'})
export class StringToDate implements PipeTransform {
  transform(value: any, [exponent]) : Date {
   
    if(value) {
        
      return new Date(value);
    }
  }
}