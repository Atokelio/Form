import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorMatcher} from '../../utils/error.matcher';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormComponent implements OnInit {
  form: FormGroup;
  contacts: FormArray;
  errorMatcher = new ErrorMatcher();

  ngOnInit(): void {
    this.form = new FormGroup({
      account: new FormGroup({
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6)
        ]),
        confirmPassword: new FormControl('')
      }, this.passwordValidator),
      profile: new FormGroup({
        userName: new FormControl(''),
        phone: new FormControl(''),
        city: new FormControl(''),
      }),
      company: new FormGroup({
        companyName: new FormControl('', Validators.required),
        ownershipType: new FormControl('', Validators.required),
        individualNumber: new FormControl('', [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9)
        ]),
        industrialEnterprisesClassifier: new FormControl('', [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9)
        ]),
        allRussianClassifierEnterprises: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8)
        ]),
        creationDate: new FormControl(''),
      }),
    });
    this.contacts = new FormArray([]);
  }

  submit(): void {
    if (this.form.valid) {
      const formData = {...this.form.value};
      console.log('formData', formData);
    }
  }

  passwordValidator(form: FormGroup) {
    const condition = form.get('password').value !== form.get('confirmPassword').value;
    return condition ? {passwordsDoNotMatch: true} : null;
  }

  addContact(): void {
    const contact = new FormGroup({
      contactName: new FormControl('', Validators.required),
      contactPosition: new FormControl('', Validators.required),
      contactPhone: new FormControl('', Validators.required)
    });
    this.contacts.push(contact);
  }
}
