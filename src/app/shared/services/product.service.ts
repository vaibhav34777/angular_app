import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      description: 'High-quality sound with noise cancellation and comfortable earcups. Up to 20 hours of battery life.',
      price: 59.99,
      imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Headphones',
      category: 'Electronics',
      stock: 10
    },
    {
      id: 2,
      name: 'Smart Watch with Heart Rate Monitor',
      description: 'Track your fitness, notifications, and heart rate with this sleek smartwatch. Water-resistant.',
      price: 129.99,
      imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Smartwatch',
      category: 'Electronics',
      stock: 7
    },
    {
      id: 3,
      name: 'Portable Power Bank 20000mAh',
      description: 'Keep your devices charged on the go with this high-capacity power bank. Dual USB outputs.',
      price: 34.50,
      imageUrl: 'https://via.placeholder.com/150/008000/FFFFFF?text=PowerBank',
      category: 'Accessories',
      stock: 15
    },
    {
      id: 4,
      name: 'Ergonomic Office Chair',
      description: 'Designed for comfort and support during long working hours. Adjustable height and lumbar support.',
      price: 189.00,
      imageUrl: 'https://via.placeholder.com/150/800080/FFFFFF?text=OfficeChair',
      category: 'Home & Office',
      stock: 5
    },
    {
      id: 5,
      name: '4K Ultra HD Smart TV 55-inch',
      description: 'Experience stunning visuals with this 55-inch 4K TV. Built-in smart features for streaming.',
      price: 499.99,
      imageUrl: 'https://via.placeholder.com/150/FFA500/FFFFFF?text=SmartTV',
      category: 'Electronics',
      stock: 3
    }
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(product => product.id === id));
  }
}
