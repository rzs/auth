import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secure-resource',
  template: `<h1 [attr.data-cy]="'some-attribute'">Secure-resource works!</h1>`,
  styles: [`
    h1 {
      color: green;
    }
  `]
})
export class SecureResourceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
