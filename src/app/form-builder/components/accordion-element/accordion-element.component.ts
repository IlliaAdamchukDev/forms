import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AccordionDataService } from './accordion.data.service';
import {
  changeFormStylesAction,
  changeStylesAction,
} from '../../reducers/field/field.actions';
import { FieldsState } from '../../reducers/field/field.reducer';
import { Element } from 'src/app/shared/interfaces/interfaces';
import { selectFields } from '../../reducers/field/field.selectors';
import { createFormGroup } from './accordion-element-functions';
import { Unsubscriber } from 'src/app/shared/Unsubscriber/Unsubscriber';

@Component({
  selector: 'app-accordion-element',
  templateUrl: './accordion-element.component.html',
  styleUrls: ['./accordion-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AccordionDataService],
})
export class AccordionElementComponent extends Unsubscriber {
  public override notifier = new Subject();

  constructor(
    private store$: Store<FieldsState>,
    private data: AccordionDataService
  ) {
    super();
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

  fields$: Observable<Element[]> = this.store$.pipe(select(selectFields));

  @Input()
  public title: string = '';

  @Input()
  public fieldName: string = '';

  public panelOpenState = false;

  public fieldStyles: FormGroup = createFormGroup();
  public formStyles: FormGroup = createFormGroup();

  sendStyles(): void {
    if (this.fieldName !== 'form') {
      this.store$.dispatch(
        new changeStylesAction({
          styles: this.fieldStyles.value,
        })
      );
      return;
    }

    this.store$.dispatch(
      new changeFormStylesAction({
        styles: this.formStyles.value,
      })
    );
  }
}
