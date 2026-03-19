import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { Category } from './models/category.model';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  selectedProducts: Product[] = [];

  constructor(private productService: ProductService) {
    this.categories = this.productService.getCategories();
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category;
    this.selectedProducts = this.productService.getProductsByCategoryId(category.id);
  }

  isActive(category: Category): boolean {
    return this.selectedCategory?.id === category.id;
  }
}