import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { FieldStyles } from 'src/app/shared/interfaces/interfaces';
import { selectFields } from '../../reducers/field/field.selectors';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../shared/dialog/dialog.component';

@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldsComponent {
  fields$ = this.store$.pipe(select(selectFields));
  notifier = new Subject();
  styles!: FieldStyles;

  constructor(private store$: Store, private dialog: MatDialog) {
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
  clicks = {
    input: (id: { id: number }) => {},
    textarea: (id: { id: number }) => {},
    button: (id: { id: number }) => {},
    checkbox: (id: { id: number }) => {},
    select: (id: { id: number }) => {},
  };

  @Input()
  key!: number;

  @Input()
  form!: FormGroup;

  ngOnDestroy() {
    this.notifier.next(false);
    this.notifier.complete();
  }

  changeType(event: any) {
    switch (this.field) {
      case 'input':
        this.clicks['input']({ id: this.key });
        break;
      case 'textarea':
        this.clicks['textarea']({ id: this.key });
        break;
      case 'button':
        this.clicks['button']({ id: this.key });
        break;
      case 'select':
        this.clicks['select']({ id: this.key });
        break;
      case 'checkbox':
        this.clicks['checkbox']({ id: this.key });
        break;
    }
  }

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
}
