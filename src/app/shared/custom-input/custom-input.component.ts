import {
  Component,
  forwardRef,
  Input,
  ViewChild,
  ElementRef,
  Renderer2,
  HostListener,
  ChangeDetectionStrategy,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomInputComponent implements ControlValueAccessor, Validator {
  @Input() public inputTitle!: string;
  @Input() public inputType!: string;

  @ViewChild('element', { static: true, read: ElementRef })
  private elementRef!: ElementRef;
  @HostListener('input', ['$event.target.value'])
  private onInput = (value: string): void => {
    this.value = value;
  };

  private onTouch = (val: string): void => {};
  private val = '';

  constructor(private renderer: Renderer2) {}

  public validate(control: AbstractControl): ValidationErrors | null {
    return control.value?.length ? null : { valid: false };
  }

  public set value(val: string) {
    if (val !== undefined && this.val !== val) {
      this.val = val;
      this.onInput(val);
      this.onTouch(val);
    }
  }

  public writeValue() {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'value',
      this.val
    );
    this.onInput(this.val);
  }

  public registerOnChange(fn: (_: string) => void): void {
    this.onInput = (value: string) => {
      this.value = value;
      fn(value);
    };
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
