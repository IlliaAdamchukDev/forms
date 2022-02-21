import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import {
  IFormElementStyles,
  IFormElement,
} from '../../../shared/interfaces/interfaces';
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { Unsubscriber } from '../../../shared/unsubscriber/unsubscriber';
import { startStyles } from '../../../shared/constants/constants';
import { selectFormElements } from '../../reducers/form/form.selectors';
import { changeCheckedElementId } from '../../reducers/form/form.actions';

@Component({
  selector: 'app-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormElementComponent extends Unsubscriber {
  @Input()
  public formElementName: string = '';
  @Input()
  public isChangable: boolean = false;
  @Input()
  public key!: number;
  @Input()
  public form!: FormGroup;

  public formElements$ = this.store.select(selectFormElements);
  public formElementStyles$ = new Subject<IFormElementStyles>();

  constructor(private store: Store, private matDialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.formElements$
      .pipe(takeUntil(this.notifier$))
      .subscribe((formElements) => {
        let el = formElements.find(
          (formElement: IFormElement) => formElement.id === this.key
        );
        this.formElementStyles$.next(el?.styles ?? startStyles);
      });
  }

  public message(): void {
    if (!this.isChangable) {
      return;
    }
    if (this.form.invalid) {
      this.matDialog.open(DialogComponent, {
        data: {
          message: 'Check if all required fields are filled!',
        },
      });
      return;
    }
    let message = '';
    message = 'Information:\n';
    for (const key in this.form.value) {
      message = message + this.form.value[key] + '\n';
    }
    message = message + 'Succesfully sended!';
    this.matDialog.open(DialogComponent, {
      data: {
        message,
      },
    });
  }

  public changeCheckedId(): void {
    this.store.dispatch(changeCheckedElementId({ id: this.key }));
  }
}
