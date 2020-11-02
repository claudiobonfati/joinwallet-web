import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/core/services/helper.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/core/models/user.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public env = environment;
  public loginBtnStatus: string = '';

  public loginForm: FormGroup;
  public loginSent: boolean = false;
  public emailErrorMsg: string;
  public emailAnimateShake: boolean = false;
  public passwordAnimateShake: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private helperService: HelperService,
    private httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initiate form
    this.loginForm = this.formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6)
        ]
      ]
    });
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

  setBtn(status: string) {
    switch (status) {
      case '':
        this.loginBtnStatus = status;
        break;
      case 'loading':
        this.loginBtnStatus = status;
        break;
      case 'error':
        this.loginBtnStatus = 'feedback-error';
        setTimeout(() => {
          this.setBtn('');
        }, 1000);
        break;
      case 'ok':
        this.loginBtnStatus = 'feedback-ok';
        setTimeout(() => {
          this.setBtn('');
        }, 1000);
        break;
      default:
        console.error('Invalid argument for setBtn()');
    }
  }

  login(): void {
    this.loginSent = true;

    if (this.loginForm.invalid) {
      this.applyShakeAnimation('password');
      this.setBtn('error');
      return;
    }

    this.setBtn('loading');

    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;

    this.httpService.buildUrl('users/login')
    .post({ email, password })
    .subscribe(
      (data: UserModel) => {
        this.setBtn('ok');

        setTimeout(() => {
          this.httpService.createLocalUser(data);
          this.router.navigate(['dashboard']);
        }, 600);
      }, (error: HttpErrorResponse) => {
        this.setBtn('error');
        this.applyShakeAnimation('password');
      }
    )
  }
}
