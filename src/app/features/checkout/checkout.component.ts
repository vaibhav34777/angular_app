import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { CartService } from '../../../shared/services/cart.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  cartTotal: number = 0;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      cardName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
      expMonth: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])$/)]],
      expYear: ['', [Validators.required, Validators.pattern(/^(20)\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]]
    });

    this.cartService.getCartTotal().subscribe(total => {
      this.cartTotal = total;
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      if (this.cartTotal === 0) {
        this.snackBar.open('Your cart is empty. Please add items before checking out.', 'Dismiss', { duration: 3000 });
        this.router.navigate(['/products']);
        return;
      }
      console.log('Order placed:', this.checkoutForm.value);
      this.cartService.clearCart();
      this.snackBar.open('Order placed successfully!', 'Dismiss', { duration: 3000 });
      this.router.navigate(['/products']);
    } else {
      this.snackBar.open('Please fill out all required fields correctly.', 'Dismiss', { duration: 3000 });
    }
  }
}
