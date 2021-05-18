import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private domSanitzer:DomSanitizer){}

  transform(value: any): SafeHtml {
    return this.domSanitzer.bypassSecurityTrustHtml(value);
  }

}
