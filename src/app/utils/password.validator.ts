import {FormGroup} from '@angular/forms';

export class PasswordValidator {
  validate(form: FormGroup): {passwordsDoNotMatch: true} | null {
    const condition = form.get('password').value !== form.get('confirmPassword').value;
    return condition ? {passwordsDoNotMatch: true} : null;
  }
}
