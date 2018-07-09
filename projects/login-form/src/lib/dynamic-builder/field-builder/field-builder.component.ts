import { Component } from '@angular/core';
import { Input }     from '@angular/core';
import { OnInit }    from '@angular/core';
import { FormGroup } from '@angular/forms';

// Enums
import { FieldTypes } from '../../enums/field-types.enum';

@Component({
  selector    : 'cal-field-builder',
  templateUrl : './field-builder.component.html',
})
export class FieldBuilderComponent implements OnInit
{
  @Input() form       : FormGroup;
  @Input() field      : any;
  @Input() params     : any;
  @Input() properties : any;

  public   fieldTypes              = FieldTypes;

  constructor() { }

  public ngOnInit() : void { }

}
