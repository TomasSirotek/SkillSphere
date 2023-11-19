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
  
  constructor(private readonly _formBuilder: FormBuilder,  private _router: Router,private authService: AuthService) {}
  

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['test3@gmail.com', [Validators.required, Validators.email]],
      password: ['Admin1!', Validators.required],
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

    if (this.form.invalid) {
      return;
    }

    this.authService.authenticate(email, password)
    .subscribe({
      next: () => {
        this._router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        // Handle errors here
        // 401
        // display alert
      }
    });
  
  
  
  }
}
