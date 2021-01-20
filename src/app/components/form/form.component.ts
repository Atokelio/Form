import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorMatcher} from '../../utils/error.matcher';
import {PasswordValidator} from '../../utils/password.validator';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/user.interface';
import {transformDate} from '../../utils/transformDate.function';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormComponent implements OnInit {
  userData: User;
  form: FormGroup;
  errorMatcher = new ErrorMatcher();
  passwordValidator = new PasswordValidator();

  constructor(private readonly userService: UserService) {
  }

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
        confirmPassword: new FormControl('', Validators.required)
      }, this.passwordValidator.validate),
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
      contacts: new FormArray([])
    });

    this.userService.getUser().subscribe(data => {
      this.userData = data;
      this.form.patchValue({
        account: {
          email: this.userData.email,
          password: this.userData.password,
          confirmPassword: this.userData.confirmPassword
        },
        profile: {
          userName: this.userData.userName,
          phone: this.userData.phone,
          city: this.userData.city
        },
        company: {
          companyName: this.userData.companyName,
          ownershipType: this.userData.ownershipType,
          individualNumber: this.userData.individualNumber,
          industrialEnterprisesClassifier: this.userData.industrialEnterprisesClassifier,
          allRussianClassifierEnterprises: this.userData.allRussianClassifierEnterprises,
          // creationDate: new Date(...transformDate(this.userData.creationDate))
        }
      });
    });

    console.log();
  }

  submit(): void {
    if (this.form.valid) {
      const formData = {...this.form.value};
      console.log('formData', formData);
    }
  }

  addContact(): void {
    const contact = new FormGroup({
      contactName: new FormControl('', Validators.required),
      contactPosition: new FormControl('', Validators.required),
      contactPhone: new FormControl('', Validators.required)
    });
    (this.form.get('contacts') as FormArray).push(contact);
  }

  onChangeOwnershipType(): void {
    const control = this.form.get('company.industrialEnterprisesClassifier');
    this.form.get('company.ownershipType').value !== 'le' ? control.disable() : control.enable();
  }
}
