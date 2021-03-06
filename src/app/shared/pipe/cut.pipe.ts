import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cut',
})
export class CutPipe implements PipeTransform {
  transform(value: string): string {
    if (value.length < 25) return value;
    return value.substring(0, 22) + '...';
  }
}
