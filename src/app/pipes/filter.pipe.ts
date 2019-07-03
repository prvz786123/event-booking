import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if(args){
      args=args.toLowerCase();
      let filtered = value.filter(ele=>{
        console.log();
        return ele.name.toLowerCase().indexOf(args)>-1;
      })
      if(filtered.length===0){
        filtered[0]=false;
      }
      return filtered;
    }
    return value;
  }

}
