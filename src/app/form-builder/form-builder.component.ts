import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { select, Store } from '@ngrx/store';
import { FieldsState } from './reducers/field/field.reducer';
import { FieldStyles } from '../shared/interfaces/interfaces';
import { Subject, takeUntil } from 'rxjs';
import { selectFields, selectType } from './reducers/field/field.selectors';
import {
  addFieldAction,
  deleteFieldAction,
} from './reducers/field/field.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';
import { startStyles } from '../shared/constants/constants';
import { Unsubscriber } from '../shared/Unsubscriber/Unsubscriber';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuilderComponent extends Unsubscriber {
  public fieldName = '';
  private type$ = this.store$.pipe(select(selectType));
  private fields$ = this.store$.pipe(select(selectFields));
  public styles!: FieldStyles;

  public upGroup = new FormGroup({
    0: new FormControl(),
    1: new FormControl(),
    3: new FormControl(),
    4: new FormControl(),
  });
  public group!: FormGroup;

  public override notifier = new Subject();
  private values!: { [key: string | number]: string };
  constructor(private store$: Store<FieldsState>, private auth: AuthService) {
    super();
    this.type$.pipe(takeUntil(this.notifier)).subscribe((type) => {
      this.fieldName = type;
    });
    this.fields$.pipe(takeUntil(this.notifier)).subscribe((fields) => {
      if (this.styles !== fields[0]?.styles) {
        this.styles = fields[0]?.styles ?? this.styles;
      }

      let newGroup: { [key: string | number]: FormControl } = {};
      fields
        .filter((el) => el.id > 0 && el.type !== 'button')
        .forEach((el) => {
          newGroup[el.id] = el.styles.required
            ? new FormControl('', Validators.required)
            : new FormControl();
        });
      if (this.group) {
        this.values = this.group.value;
      }
      this.group = new FormGroup(newGroup);
      this.group.patchValue(this.values);
    });
  }

  public fields = [
    { fieldName: 'input', key: 0 },
    { fieldName: 'textarea', key: 1 },
    { fieldName: 'button', key: 2 },
    { fieldName: 'checkbox', key: 3 },
    { fieldName: 'select', key: 4 },
  ];
  private index = 4;
  public form: { fieldName: string; key: number }[] = [];

  public drop(event: CdkDragDrop<{ fieldName: string; key: number }[]>):void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      return;
    }

    if (event.container.data === this.fields) {
      this.store$.dispatch(
        new deleteFieldAction({ id: this.form[event.previousIndex].key })
      );
      this.form.splice(event.previousIndex, 1);
      return;
    }
    this.form.splice(event.currentIndex, 0, {
      ...event.previousContainer.data[event.previousIndex],
    });
    this.form[event.currentIndex].key = ++this.index;
    this.store$.dispatch(
      new addFieldAction({
        id: this.form[event.currentIndex].key,
        styles: JSON.parse(JSON.stringify(startStyles)),
        type: this.fields[event.previousIndex].fieldName,
      })
    );
  }

  noDestroy = true;

  logout():void {
    this.auth.logout();
  }
}
