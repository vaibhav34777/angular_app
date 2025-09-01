import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { User } from '../../../shared/models/user.model';
import { AuthService } from '../../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bio: ['', Validators.maxLength(500)],
      avatarUrl: ['']
    });
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.profileForm.patchValue({
          name: user.name,
          email: user.email,
          bio: user.bio || '',
          avatarUrl: user.avatarUrl || ''
        });
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.currentUser) {
      const updatedUser: User = {
        ...this.currentUser,
        name: this.profileForm.value.name,
        email: this.profileForm.value.email,
        bio: this.profileForm.value.bio,
        avatarUrl: this.profileForm.value.avatarUrl
      };
      this.authService.updateProfile(updatedUser).subscribe(
        () => {
          this.snackBar.open('Profile updated successfully!', 'Dismiss', { duration: 3000 });
        },
        error => {
          this.snackBar.open('Error updating profile.', 'Dismiss', { duration: 3000 });
          console.error('Profile update error', error);
        }
      );
    } else {
      this.snackBar.open('Please correct the form errors.', 'Dismiss', { duration: 3000 });
    }
  }

  changeAvatar(): void {
    // In a real application, this would trigger a file upload dialog
    // For now, let's prompt for a URL
    const newAvatarUrl = prompt('Enter new avatar URL:');
    if (newAvatarUrl && this.currentUser) {
      this.profileForm.patchValue({ avatarUrl: newAvatarUrl });
      // Optionally, call onSubmit to save immediately or let user save manually
    }
  }
}
