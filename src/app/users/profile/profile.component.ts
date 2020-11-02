import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { ProfileModel } from 'src/app/core/models/profile.model';
import { HelperService } from 'src/app/core/services/helper.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  public env = environment;
  public currentUser: ProfileModel;
  public profileForm: FormGroup;
  public profileSent: boolean = false;
  public profileBtnStatus: string = '';
  public nameAnimateShake: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public httpService: HttpService,
    public helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.httpService.getLocalUser();

    let birthday: string;
    if (this.currentUser.birthday) {
      birthday = new Date(this.currentUser.birthday).toISOString().substr(0, 10);
    }

    // Initiate forms
    this.profileForm = this.formBuilder.group({
      name: [
        this.currentUser.name,
        [
          Validators.required
        ]
      ],
      email: [
        {
          value: this.currentUser.email,
          disabled: true
        },
        [
          Validators.required,
          Validators.email
        ]
      ]
    });
  }

  setBtn(status: string) {
    switch (status) {
      case '':
        this.profileBtnStatus = status;
        break;
      case 'loading':
        this.profileBtnStatus = status;
        break;
      case 'error':
        this.profileBtnStatus = 'feedback-error';
        setTimeout(() => {
          this.setBtn('');
        }, 1000);
        break;
      case 'ok':
        this.profileBtnStatus = 'feedback-ok';
        setTimeout(() => {
          this.setBtn('');
        }, 1000);
        break;
      default:
        console.error('Invalid argument for setBtn()');
    }
  }

  getBtnStatus(): string {
    return this.profileBtnStatus;
  }

  applyShakeAnimation(target: string): void {
    const tgt = target + 'AnimateShake';

    if (this[tgt] === undefined)
      return

    this[tgt] = true;

    setTimeout(() => {
      if (this[tgt]) this[tgt] = false;
    }, 800)
  }

  update(): void {
    if (this.profileBtnStatus !== '')
      return

    this.profileSent = true;
    if (this.profileForm.invalid) {
      if (this.profileForm.get('name').status === "INVALID") {
        this.applyShakeAnimation('name');
      }

      this.setBtn('error');
      return;
    }
    this.setBtn('loading');

    const body = {
      name: this.profileForm.get('name').value
    }

    this.httpService.buildUrl('users/me')
    .patch(body)
    .subscribe(
      (user: ProfileModel) => {
        this.setBtn('ok');
        this.httpService.saveLocalUser(user);
      }, (error: HttpErrorResponse) => {
        this.setBtn('error');
        console.log(error);
      }
    )
  }
}
