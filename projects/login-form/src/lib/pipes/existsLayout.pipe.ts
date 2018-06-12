import { Pipe }          from '@angular/core';
import { PipeTransform } from '@angular/core';

@Pipe({name: 'existsLayout'})
export class ExistsLayoutPipe implements PipeTransform
{
    transform(value : any, layout : string)
    {
      for ( let key of Object.keys(value) )
        if ( value[key] === layout )
          return true;

      return false;
    }
}
