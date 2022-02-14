import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { FieldStyles } from 'src/app/shared/interfaces/interfaces';
import { selectFields } from '../../reducers/field/field.selectors';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { Unsubscriber } from '../../../shared/Unsubscriber/Unsubscriber';
import { changeCheckedAction } from '../../reducers/field/field.actions';

@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldsComponent extends Unsubscriber {
  fields$ = this.store$.pipe(select(selectFields));
  override notifier = new Subject();
  styles!: FieldStyles;

  constructor(private store$: Store, private dialog: MatDialog) {
    super();
    this.fields$.pipe(takeUntil(this.notifier)).subscribe((fields) => {
      let el = fields.find(
        (field: { id: number; styles: FieldStyles }) => field.id === this.key
      );
      if (this.styles !== el?.styles) {
        this.styles = el?.styles ?? this.styles;
      }
    });
  }
  @Input()
  field: string = '';

  @Input()
  isChangable: boolean = false;

  @Input()
  key!: number;

  @Input()
  form!: FormGroup;

  message() {
    if (!this.isChangable) {
      return;
    }
    if (this.form.invalid) {
      this.dialog.open(DialogComponent, {
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
    this.dialog.open(DialogComponent, {
      data: {
        message,
      },
    });
  }

  changeCheckedId() {
    this.store$.dispatch(new changeCheckedAction({ id: this.key }));
  }
}
