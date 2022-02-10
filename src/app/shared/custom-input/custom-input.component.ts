import {
  Component,
  forwardRef,
  Input,
  ViewChild,
  ElementRef,
  Renderer2,
  HostListener,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
  template: `
    <span>{{ inputTitle }}</span>
    <input type="{{ inputType }}" #element />
  `,
})
export class CustomInputComponent implements ControlValueAccessor, Validator {
  @Input() inputTitle!: string;
  @Input() inputType!: string;
  @ViewChild('element', { static: true, read: ElementRef })
  elementRef!: ElementRef;

  constructor(private renderer: Renderer2) {}

  @HostListener('input', ['$event.target.value'])
  onInput = (value: any) => {
    this.value = value;
  };

  onTouch: any = () => {};
  val = '';

  validate(control: AbstractControl): ValidationErrors | null {
    return control.value?.length ? null : { valid: false };
  }

  ngOnInit() {} // to change start value this.value = "newValue";

  set value(val: string) {
    if (val !== undefined && this.val !== val) {
      this.val = val;
      this.onInput(val);
      this.onTouch(val);
    }
  }

  writeValue() {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'value',
      this.val
    );
    this.onInput(this.val);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onInput = (value: string) => {
      this.value = value;
      fn(value);
    };
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
}
