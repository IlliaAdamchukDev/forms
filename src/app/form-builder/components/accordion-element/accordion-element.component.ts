import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AccordionDataService } from './accordion.data.service';
import {
  changeFormStylesAction,
  changeStylesAction,
} from '../../reducers/field/field.actions';
import { FieldsState, FieldStyles } from '../../reducers/field/field.reducer';
import { selectFields } from '../../reducers/field/field.selectors';

@Component({
  selector: 'app-accordion-element',
  templateUrl: './accordion-element.component.html',
  styleUrls: ['./accordion-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AccordionDataService],
})
export class AccordionElementComponent {
  fields$: Observable<[{ id: number; styles: FieldStyles; type: string }]> =
    this.store$.pipe(select(selectFields));
  notifier = new Subject();
  constructor(
    private store$: Store<FieldsState>,
    private data: AccordionDataService
  ) {
    this.fields$.pipe(takeUntil(this.notifier)).subscribe((newFields) => {
      if (this.formStyles.value !== newFields[0].styles) {
        this.formStyles.setValue(newFields[0].styles);
      }
    });
    this.data.fieldStyles$
      .pipe(takeUntil(this.notifier))
      .subscribe((styles) => {
        this.fieldStyles.setValue(styles);
      });
  }

  @Input()
  title: string = '';

  @Input()
  fieldName: string = '';

  ngOnDestroy() {
    this.notifier.next(false);
    this.notifier.complete();
  }

  panelOpenState = false;
  fieldStyles: FormGroup = new FormGroup({
    height: new FormControl(),
    width: new FormControl(),
    placeholder: new FormControl(),
    required: new FormControl(),
    'border-style': new FormControl(),
    'border-color': new FormControl(),
    'border-width': new FormControl(),
    'font-size': new FormControl(),
    'font-weight': new FormControl(),
    color: new FormControl(),
  });

  formStyles: FormGroup = new FormGroup({
    height: new FormControl(),
    width: new FormControl(),
    placeholder: new FormControl(),
    required: new FormControl(),
    'border-style': new FormControl(),
    'border-color': new FormControl(),
    'border-width': new FormControl(),
    'font-size': new FormControl(),
    'font-weight': new FormControl(),
    color: new FormControl(),
  });

  sendStyles() {
    this.store$.dispatch(
      new changeStylesAction({
        styles: this.fieldStyles.value,
      })
    );
  }

  sendFormStyles() {
    this.store$.dispatch(
      new changeFormStylesAction({
        styles: this.formStyles.value,
      })
    );
  }
}
