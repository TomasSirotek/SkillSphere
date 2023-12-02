import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';



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
  providers: [HttpClient],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  
  private sub: Subscription;
  
  constructor(private readonly _formBuilder: FormBuilder,  private _router: Router,private authService: AuthService, private toastr: ToastrService) {}
  
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe();
  }
  
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
        this._router.navigate(['/courses']);
      },
      error: (err: any) => {
        this.toastr.error(JSON.stringify(err));
        // Handle errors here
        // 4013
        // display alert
      }
    });
  
  
  
  }
}
