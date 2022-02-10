import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AccordionDataService } from './accordion.data.service';
import { changeFormStylesAction, changeStylesAction } from '../../reducers/field/field.actions';
import { FieldsState, FieldStyles } from '../../reducers/field/field.reducer';
import { selectFields } from '../../reducers/field/field.selectors';

@Component({
  selector: 'app-accordion-element',
  templateUrl: './accordion-element.component.html',
  styleUrls: ['./accordion-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AccordionDataService]
})
export class AccordionElementComponent {
  fields$ : Observable<[{id:number, styles:FieldStyles, type : string}]> = this.store$.pipe(select(selectFields));
  notifier = new Subject();
  constructor(private store$: Store<FieldsState>, private data: AccordionDataService) {
    this.fields$.pipe(takeUntil(this.notifier)).subscribe((newFields)=>{
      if (this.formStyles.value !== newFields[0].styles) {
        this.formStyles.setValue(newFields[0].styles);
      }
    });
    this.data.fieldStyles$.pipe(takeUntil(this.notifier))
    .subscribe(styles => {
      this.fieldStyles.setValue(styles)
    })
  }

  @Input() 
  title : string = "";

  @Input()
  fieldName : string = ""; 

  ngOnDestroy() {
    this.notifier.next(false);
    this.notifier.complete();
  }

  panelOpenState = false;
  fieldStyles : FormGroup = new FormGroup({
    'height' : new FormControl(),
    'width' : new FormControl(),
    'placeholder' : new FormControl(),
    'required' : new FormControl(),
    'border-style' : new FormControl(),
    'border-color' : new FormControl(),
    'border-width' : new FormControl(),
    'font-size' : new FormControl(),
    'font-weight' : new FormControl(),
    'color' : new FormControl()
  })

  formStyles : FormGroup = new FormGroup({
    'height' : new FormControl(),
    'width' : new FormControl(),
    'placeholder' : new FormControl(),
    'required' : new FormControl(),
    'border-style' : new FormControl(),
    'border-color' : new FormControl(),
    'border-width' : new FormControl(),
    'font-size' : new FormControl(),
    'font-weight' : new FormControl(),
    'color' : new FormControl()
  })

  sendStyles () {
    this.store$.dispatch(new changeStylesAction({
      styles: {
        'height': this.fieldStyles.controls['height']?.value ?? "",
        'width' : this.fieldStyles.controls['width']?.value ?? "",
        'placeholder' : this.fieldStyles.controls['placeholder']?.value ?? "",
        'required' : this.fieldStyles.controls['required'].value === "required" ? true : false,
        'border-style' : this.fieldStyles.controls['border-style']?.value ?? "",
        'border-color' : this.fieldStyles.controls['border-color']?.value ?? "#717171",
        'border-width' : this.fieldStyles.controls['border-width']?.value ?? "",
        'font-size' : this.fieldStyles.controls['font-size']?.value ?? "",
        'font-weight' : this.fieldStyles.controls['font-weight']?.value ?? "",
        'color' : this.fieldStyles.controls['color']?.value ?? ""
      }
    }))
  }

  sendFormStyles () {
    this.store$.dispatch(new changeFormStylesAction({
      styles: {
        'height': this.formStyles.controls['height']?.value ?? "",
        'width' : this.formStyles.controls['width']?.value ?? "",
        'placeholder' : this.formStyles.controls['placeholder']?.value ?? "",
        'required' : this.formStyles.controls['required'].value === "required" ? true : false,
        'border-style' : this.formStyles.controls['border-style']?.value ?? "",
        'border-color' : this.formStyles.controls['border-color']?.value ?? "#C0C0C0",
        'border-width' : this.formStyles.controls['border-width']?.value ?? "",
        'font-size' : this.formStyles.controls['font-size']?.value ?? "",
        'font-weight' : this.formStyles.controls['font-weight']?.value ?? "",
        'color' : this.formStyles.controls['color']?.value ?? ""
      }
    }))
  }
}
