import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { select, Store } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs';
import {
  IDraggableElement,
  IFormElementStyles,
  IFormValues,
  IFormElementsState,
} from '../shared/interfaces/interfaces';
import { selectFormElements, selectType } from './reducers/form/form.selectors';
import {
  addFormElement,
  deleteFormElement,
  setStoreStateToInitial,
} from './reducers/form/form.actions';
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
  public formSectionStyles!: IFormElementStyles;
  public formSectionGroup = new FormGroup({});
  public upGroup = new FormGroup({
    0: new FormControl(),
    1: new FormControl(),
    3: new FormControl(),
    4: new FormControl(),
  });
  public draggableFormElements = formElementsArr;
  public droppedFormElements: IDraggableElement[] = [];
  public formElementType$ = this.store.pipe(
    select(selectType),
    takeUntil(this.notifier$)
  );

  private droppedElementsValues!: IFormValues;
  private formElements$ = this.store.select(selectFormElements);

  constructor(
    private store: Store<IFormElementsState>,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this.formElements$
      .pipe(takeUntil(this.notifier$))
      .subscribe((formElements) => {
        if (this.formSectionStyles !== formElements[0]?.styles) {
          this.formSectionStyles =
            formElements[0]?.styles ?? this.formSectionStyles;
        }
      });
  }

  public drop(event: CdkDragDrop<IDraggableElement[]>): void {
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
        deleteFormElement({
          id: this.droppedFormElements[event.previousIndex].key,
        })
      );
      this.formSectionGroup.removeControl(
        this.droppedFormElements[event.previousIndex].key.toString()
      );
      this.droppedFormElements.splice(event.previousIndex, 1);
      return;
    }
    this.droppedFormElements.splice(event.currentIndex, 0, {
      ...event.previousContainer.data[event.previousIndex],
    });
    this.droppedFormElements[event.currentIndex].key = Date.now();

    if (this.droppedFormElements[event.currentIndex].fieldName != 'button') {
      this.formSectionGroup.addControl(
        this.droppedFormElements[event.currentIndex].key.toString(),
        new FormControl()
      );
    }

    this.store.dispatch(
      addFormElement({
        id: this.droppedFormElements[event.currentIndex].key,
        styles: JSON.parse(JSON.stringify(startStyles)),
        fieldType: this.draggableFormElements[event.previousIndex].fieldName,
      })
    );
  }

  public logout(): void {
    this.formSectionGroup = new FormGroup({});
    this.authService.logout();
    this.store.dispatch(setStoreStateToInitial());
  }
}
