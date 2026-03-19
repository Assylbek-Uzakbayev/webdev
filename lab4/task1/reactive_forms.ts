import {ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="profileForm" (ngSubmit)="handleSubmit()">
      <label>Name
        <input type="text"[formGroup]="profileForm" />
      </label>
      <label>Email
        <input type="email" [formGroup]="profileForm" />
      </label>
      <button type="submit">Submit</button>
      <h2>Profile Form</h2>
        <p>Name: {{ profileForm.value.name }}</p>
        <p>Email: {{ profileForm.value.email }}</p>
    </form>
  `,
  imports: [ReactiveFormsModule],
})
export class App {
    profileForm = new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
      });
      handleSubmit() {
        alert(
          this.profileForm.value.name + ' | ' + this.profileForm.value.email
        );
    }
}