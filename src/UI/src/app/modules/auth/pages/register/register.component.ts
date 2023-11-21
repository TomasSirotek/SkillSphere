import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { AlertServiceService } from 'src/app/shared/service/alert-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    HttpClientModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private _router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onRegister() {
    const { email, password } = this.form.value;

    if (this.form.invalid) {
      return;
    }

    this.authService.register(email, password).subscribe({
      next: (response: any) => {
        if (response.succeeded) {
          this.toastr.success('Registration successful. Please login');
          this._router.navigate(['/auth/login']);
        } else {
          // Handle registration failure
          if (response.errors && response.errors.length > 0) {
            const errorMessage = response.errors[0];
            this.toastr.error(errorMessage);
          } else {
            this.toastr.error('Registration failed: unknown error');
          }
        }
      },
      error: (error: any) => {
        this.toastr.error(error);
      },
    });
  }
}
