import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { FieldStyles, FormElement } from 'src/app/shared/interfaces/interfaces';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { Unsubscriber } from 'src/app/shared/unsubscriber/unsubscriber';
import { selectFields } from 'src/app/form-builder/reducers/field/field.selectors';
import { changeChecked } from 'src/app/form-builder/reducers/field/field.actions';

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
  public fields$ = this.store.select(selectFields);

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
      message = message + this.form.value[key] + ' ';
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
