import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { Category } from './models/category.model';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  categories: Category[] = [];

  allProducts: Product[] = [];
  favoriteIds: number[] = [];

  visibleProducts: Product[] = [];

  selectedCategoryId: number | null = null;
  selectedCategoryName: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.categories = this.productService.getCategories();

    this.allProducts = this.productService.getProducts();

    this.selectCategory(1);
  }
  get favorites(): Product[] {
    return this.allProducts.filter(p => p.isFavorite);
  }

  selectCategory(id: number): void {
    this.selectedCategoryId = id;

    const cat = this.categories.find(c => c.id === id);
    this.selectedCategoryName = cat ? cat.name : '';

    this.visibleProducts = this.allProducts.filter(p => p.categoryId === id);
  }

  toggleFavorite(productId: number): void {
    if (this.favoriteIds.includes(productId)) {
      this.favoriteIds = this.favoriteIds.filter(id => id !== productId);
    } else {
      this.favoriteIds = [...this.favoriteIds, productId];
    }
  }

  resetToAll(): void {
    this.selectedCategoryId = null;
    this.selectedCategoryName = 'Все товары';
    this.visibleProducts = [...this.allProducts];
  }
}