import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/services/http.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/core/models/user.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  public env = environment;
  public currentStep: string = 'email';

  public registerForm: FormGroup;
  public registerSent: boolean = false;
  public emailErrorMsg: string;
  public nameAnimateShake: boolean = false;
  public emailAnimateShake: boolean = false;
  public passwordAnimateShake: boolean = false;

  @ViewChild('inputName') inputName:ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250)
        ]
      ],
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
      ],
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.inputName.nativeElement.focus());
  }

  register() {
    this.registerSent = true;

    if (this.registerForm.invalid)
      return;

    const body = {
      name: this.registerForm.get('name').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value
    }

    this.httpService.buildUrl('users').post(body)
    .subscribe(
      (data: UserModel) => {
        this.httpService.createLocalUser(data);
        this.router.navigate(['dashboard']);
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
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
}
