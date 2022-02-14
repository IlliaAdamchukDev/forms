import { FormGroup, FormControl } from '@angular/forms';

export function createFormGroup(): FormGroup {
  return new FormGroup({
    height: new FormControl(),
    width: new FormControl(),
    placeholder: new FormControl(),
    required: new FormControl(),
    'border-style': new FormControl(),
    'border-color': new FormControl(),
    'border-width': new FormControl(),
    'font-size': new FormControl(),
    'font-weight': new FormControl(),
    color: new FormControl(),
  });
}
