import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { select, Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import {
  DraggableElement,
  FieldStyles,
  FormValues,
  FieldsState,
} from '../shared/interfaces/interfaces';
import { selectFields, selectType } from './reducers/field/field.selectors';
import {
  addField,
  deleteField,
  setStateToInitial,
} from './reducers/field/field.actions';
import { AuthService } from '../auth/services/auth.service';
import { startStyles, fieldsArr } from '../shared/constants/constants';
import { Unsubscriber } from '../shared/unsubscriber/unsubscriber';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuilderComponent extends Unsubscriber {
  public styles!: FieldStyles;
  public group!: FormGroup;
  public upGroup = new FormGroup({
    0: new FormControl(),
    1: new FormControl(),
    3: new FormControl(),
    4: new FormControl(),
  });
  public fields = fieldsArr;
  public form: DraggableElement[] = [];
  public type$ = this.store.pipe(select(selectType), takeUntil(this.notifier$));

  private values!: FormValues;
  private fields$ = this.store.select(selectFields);

  constructor(
    private store: Store<FieldsState>,
    private authService: AuthService
  ) {
    super(); 
  }

  ngOnInit() {
    this.fields$.pipe(takeUntil(this.notifier$)).subscribe((fields) => {
      if (this.styles !== fields[0]?.styles) {
        this.styles = fields[0]?.styles ?? this.styles;
      }

      let newGroup: { [key: string | number]: FormControl } = {};
      fields
        .filter((el) => el.id > 0 && el.fieldType !== 'button')
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

  public drop(event: CdkDragDrop<DraggableElement[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      return;
    }

    if (event.container.data === this.fields) {
      this.store.dispatch(
        deleteField({ id: this.form[event.previousIndex].key })
      );
      this.form.splice(event.previousIndex, 1);
      return;
    }
    this.form.splice(event.currentIndex, 0, {
      ...event.previousContainer.data[event.previousIndex],
    });
    this.form[event.currentIndex].key = Date.now();
    this.store.dispatch(
      addField({
        id: this.form[event.currentIndex].key,
        styles: JSON.parse(JSON.stringify(startStyles)),
        fieldType: this.fields[event.previousIndex].fieldName,
      })
    );
  }

  public logout(): void {
    this.authService.logout();
    this.store.dispatch(setStateToInitial());
  }
}
