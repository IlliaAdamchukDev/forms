import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { FieldStyles, FormElement } from '../../../shared/interfaces/interfaces';
import { selectFields } from '../../reducers/field/field.selectors';
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { Unsubscriber } from '../../../shared/unsubscriber/unsubscriber';
import { changeChecked } from '../../reducers/field/field.actions';

@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldsComponent extends Unsubscriber {
  @Input()
  public field: string = '';
  @Input()
  public isChangable: boolean = false;
  @Input()
  public key!: number;
  @Input()
  public form!: FormGroup;

  public styles!: FieldStyles;
  public fields$ = this.store.pipe(select(selectFields));
  public override notifier$ = new Subject();

  constructor(private store: Store, private matDialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.fields$.pipe(takeUntil(this.notifier$)).subscribe((fields) => {
      let el = fields.find((field: FormElement) => field.id === this.key);
      if (this.styles !== el?.styles) {
        this.styles = el?.styles ?? this.styles;
      }
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
    this.store.dispatch(changeChecked({ id: this.key }));
  }
}
