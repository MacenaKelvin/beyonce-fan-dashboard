import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compactNumber',
})
export class CompactNumberPipe implements PipeTransform {
  transform(value: string | number): string {
    return Intl.NumberFormat('en', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(Number(value));
  }
}