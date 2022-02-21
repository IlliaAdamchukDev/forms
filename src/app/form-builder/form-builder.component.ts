import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { select, Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
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
import { startStyles, formElementsArr } from '../shared/constants/constants';
import { Unsubscriber } from '../shared/unsubscriber/unsubscriber';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuilderComponent extends Unsubscriber {
  public formSectionStyles!: FieldStyles;
  public formSectionGroup!: FormGroup;
  //need to fix
  public upGroup = new FormGroup({
    0: new FormControl(),
    1: new FormControl(),
    3: new FormControl(),
    4: new FormControl(),
  });
  //end
  public draggableFormElements = formElementsArr;
  public droppedFormElements: DraggableElement[] = [];
  public formElementType$ = this.store.pipe(select(selectType), takeUntil(this.notifier$));

  private droppedElementsValues!: FormValues;
  private formElements$ = this.store.select(selectFields);

  constructor(
    private store: Store<FieldsState>,
    private authService: AuthService
  ) {
    super(); 
  }

  ngOnInit() {
    this.formElements$.pipe(takeUntil(this.notifier$)).subscribe((formElements) => {
      if (this.formSectionStyles !== formElements[0]?.styles) {
        this.formSectionStyles = formElements[0]?.styles ?? this.formSectionStyles;
      }

      let newGroup: { [key: string | number]: FormControl } = {};
      formElements
        .filter((el) => el.id > 0 && el.fieldType !== 'button')
        .forEach((el) => {
          newGroup[el.id] = el.styles.required
            ? new FormControl('', Validators.required)
            : new FormControl();
        });
      if (this.formSectionGroup) {
        this.droppedElementsValues = this.formSectionGroup.value;
      }
      this.formSectionGroup = new FormGroup(newGroup);
      this.formSectionGroup.patchValue(this.droppedElementsValues);
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

    if (event.container.data === this.draggableFormElements) {
      this.store.dispatch(
        deleteField({ id: this.droppedFormElements[event.previousIndex].key })
      );
      this.droppedFormElements.splice(event.previousIndex, 1);
      return;
    }
    this.droppedFormElements.splice(event.currentIndex, 0, {
      ...event.previousContainer.data[event.previousIndex],
    });
    this.droppedFormElements[event.currentIndex].key = Date.now();
    this.store.dispatch(
      addField({
        id: this.droppedFormElements[event.currentIndex].key,
        styles: JSON.parse(JSON.stringify(startStyles)),
        fieldType: this.draggableFormElements[event.previousIndex].fieldName,
      })
    );
  }

  public logout(): void {
    this.authService.logout();
    this.store.dispatch(setStateToInitial());
  }
}
