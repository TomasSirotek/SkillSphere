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
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroEye, heroEyeSlash } from '@ng-icons/heroicons/outline';

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
    NgIcon,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  viewProviders: [provideIcons({ heroEye, heroEyeSlash })],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  checked: boolean = false;
  passwordStrength = 0;

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
      confirmPassword: ['', Validators.required],
      
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onRegister() {
    this.submitted = true;

    const { email, password, confirmPassword } = this.form.value;

    if (this.form.invalid) {
      return;
    }

    if (password != confirmPassword) {
      this.toastr.error('Password and confirm password do not match');
      return;
    }

    if (!this.checked) {
      this.toastr.error('Please accept the terms and conditions');
      return;
    }

    this.authService.register(email, password).subscribe({
      next: (response: any) => {
        if (response.succeeded) {
          this.toastr.success('Registration successful. Please login');
          this._router.navigate(['/auth/login']);
        } else {
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

  updateChecked(event: Event): void {
    this.checked = (event.target as HTMLInputElement).checked;
  }

  updatePasswordStrength(password: any): void {
    this.passwordStrength = this.calculatePasswordStrength(password.value);
  }

  calculatePasswordStrength(password: string): number {
    // Initialize score
    let score = 0;

    // Check for minimum length
    if (password.length >= 8) {
      score++;
    }
    // Check for presence of uppercase letters
    if (/[A-Z]/.test(password)) {
      score++;
    }

    // Check for presence of numbers
    if (/\d/.test(password)) {
      score++;
    }

    // Check for presence of symbols
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score++;
    }

    return score;
  }
}
