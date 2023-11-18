import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


enum LocalLoginState {
  None,
  Waiting,
  Success,
  ErrorWrongData,
  ErrorOther
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
        HttpClientModule,
        NgClass,
        NgIf,
    ],
  providers: [AuthService,HttpClient],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  formSubmitAttempt: boolean;
  
  private sub: Subscription;
  
  constructor(private readonly _formBuilder: FormBuilder,private authService: AuthService) {}
  



  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }


  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe();
  }
  

  localLoginState = LocalLoginState.None;
  get localLoginStates() { return LocalLoginState; }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {

    const { email, password } = this.form.value;

    console.log(this.form.value)
    this.formSubmitAttempt = true;

    if (this.form.invalid) {
      return;
    }

    this.localLoginState = LocalLoginState.Waiting;

    this.form.disable();

    this.authService.authenticate(email, password).subscribe(
      _ => {
        this.localLoginState = LocalLoginState.Success;
        timer(5000).subscribe(() => this.localLoginState = LocalLoginState.None); // In case user logs out without navigating elsewhere; the 'success' would still be visible.
        this.form.enable();
      },
      err => {

        this.form.enable();

        if (err.status == 401)
          this.localLoginState = LocalLoginState.ErrorWrongData;
        else
          this.localLoginState = LocalLoginState.ErrorOther;
      }
    );
    // this._router.navigate(['/']);
  }
}
