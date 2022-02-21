import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { AccordionDataService } from './accordion.data.service';
import {
  changeFormStyles,
  changeStyles,
} from '../../reducers/field/field.actions';
import { FormElement, FieldsState } from 'src/app/shared/interfaces/interfaces';
import { selectFields } from '../../reducers/field/field.selectors';
import { createFormGroup } from './utils/accordion-element-functions';
import { Unsubscriber } from './../../../shared/unsubscriber/unsubscriber';

@Component({
  selector: 'app-accordion-element',
  templateUrl: './accordion-element.component.html',
  styleUrls: ['./accordion-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AccordionDataService],
})
export class AccordionElementComponent extends Unsubscriber {
  @Input()
  public title: string = '';
  @Input()
  public fieldName: string = '';

  public panelOpenState = false;
  public fieldStyles: FormGroup = createFormGroup();
  public formStyles: FormGroup = createFormGroup();

  private fields$: Observable<FormElement[]> = this.store.select(selectFields);

  constructor(
    private store: Store<FieldsState>,
    private accordionDataService: AccordionDataService
  ) {
    super();
    
  }

  ngOnInit() {
    this.fields$.pipe(takeUntil(this.notifier$)).subscribe((newFields) => {
      if (this.formStyles.value !== newFields[0].styles) {
        this.formStyles.setValue(newFields[0].styles);
      }
    });
    this.accordionDataService.fieldStyles$
      .pipe(takeUntil(this.notifier$))
      .subscribe((styles) => {
        this.fieldStyles.setValue(styles);
      });
  }

  public sendStyles(): void {
    if (this.fieldName !== 'form') {
      this.store.dispatch(
        changeStyles({
          styles: this.fieldStyles.value,
        })
      );
      return;
    }

    this.store.dispatch(
      changeFormStyles({
        styles: this.formStyles.value,
      })
    );
  }
}
