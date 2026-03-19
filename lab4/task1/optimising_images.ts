import {Component} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-user',
  template: `
    <p>Username: {{ username }}</p>
    <p>Preferred Framework:</p>
    <ul>
      <li>
        Static Image:
        <img src="/logo.svg" alt="Angular logo" width="32" height="32" />
      </li>
      <li>
        Dynamic Image:
        <img [src]="logoUrl" [alt]="logoAlt" width="32" height="32" />
      </li>
    </ul>
    <div class="image-container">
        <img ngSrc="www.example.com/image.png" fill position: "relative" height="600" width="800" priority/>
    </div>
    <img ngSrc="image.png" height="600" width="800" />
  `,
  imports: [NgOptimizedImage],
  providers: [provideImgixLoader('https://my.base.url/')],
})
export class User {
  logoUrl = '/logo.svg';
  logoAlt = 'Angular logo';
  username = 'youngTech';
}