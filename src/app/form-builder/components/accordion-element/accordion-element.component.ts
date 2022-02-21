import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AccordionDataService } from './accordion.data.service';
import {
  changeFormStyles,
  changeStyles,
} from '../../reducers/field/field.actions';
import { FormElement, FieldsState } from 'src/app/shared/interfaces/interfaces';
import { selectFields } from '../../reducers/field/field.selectors';
import { createFormGroup } from './accordion-element-functions';
import { Unsubscriber } from '../../../shared/unsubscriber/unsubscriber';

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
  public formElementName: string = '';

  public panelOpenState = false;
  public formElementStyles: FormGroup = createFormGroup();
  public formSectionStyles: FormGroup = createFormGroup();

  private formElements$: Observable<FormElement[]> = this.store.select(selectFields);

  constructor(
    private store: Store<FieldsState>,
    private accordionDataService: AccordionDataService
  ) {
    super();
  }

  ngOnInit() {
    this.formElements$.pipe(takeUntil(this.notifier$)).subscribe((newFormElements) => {
      if (this.formSectionStyles.value !== newFormElements[0].styles) {
        this.formSectionStyles.setValue(newFormElements[0].styles);
      }
    });
    this.accordionDataService.formElementStyles$
      .pipe(takeUntil(this.notifier$))
      .subscribe((styles) => {
        this.formElementStyles.setValue(styles);
      });
  }

  public sendStyles(): void {
    if (this.formElementName !== 'form') {
      this.store.dispatch(
        changeStyles({
          styles: this.formElementStyles.value,
        })
      );
      return;
    }

    this.store.dispatch(
      changeFormStyles({
        styles: this.formSectionStyles.value,
      })
    );
  }
}
