import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['user', Validators.required],
      password: ['password', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      try {
        this.authService.login(username, password).subscribe(
          () => {
            this.snackBar.open('Logged in successfully!', 'Dismiss', { duration: 3000 });
            this.router.navigate(['/profile']);
          },
          (error) => {
            this.snackBar.open('Login failed: ' + error.message, 'Dismiss', { duration: 3000 });
          }
        );
      } catch (error: any) {
        this.snackBar.open('Login failed: ' + error.message, 'Dismiss', { duration: 3000 });
      }
    } else {
      this.snackBar.open('Please enter both username and password.', 'Dismiss', { duration: 3000 });
    }
  }
}
