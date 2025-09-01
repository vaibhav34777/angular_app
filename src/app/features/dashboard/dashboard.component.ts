import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';

interface DashboardCard {
  title: string;
  value: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardCards: DashboardCard[] = [
    { title: 'Total Orders', value: '125', icon: 'shopping_cart', color: '#3f51b5' },
    { title: 'Pending Orders', value: '3', icon: 'hourglass_empty', color: '#ff9800' },
    { title: 'Total Revenue', value: '$12,345.67', icon: 'attach_money', color: '#4caf50' },
    { title: 'Registered Users', value: '540', icon: 'people', color: '#f44336' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
