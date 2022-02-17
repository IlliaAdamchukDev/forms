import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notNull',
})
export class NotNullPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value?.length) {
      return '';
    }
    return value;
  }
}
