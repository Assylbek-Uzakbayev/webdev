import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

type SidebarCategory = { id: number; label: string; count: number };

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnChanges {
  @Input() products: Product[] = [];
  @Input() categoryName: string = '';
  // @Input() categories: Category[] = [];
  @Input() categories: any[] = [];
  @Input() allProducts: Product[] = [];
  @Input() favorites: Product[] = [];

  @Input() favoriteIds: number[] = [];

  @Input() selectedCategoryId: number | null = null;

  @Output() categorySelected = new EventEmitter<number>();

  @Output() resetRequested = new EventEmitter<void>();
  @Output() favoriteToggled = new EventEmitter<number>();

  onFavoriteToggled(id: number): void {
    this.favoriteToggled.emit(id);
  }

  isFavorite(id: number): boolean {
    return this.favoriteIds.includes(id);
  }
  get favoritesFiltered(): Product[] {
    return (this.products || []).filter(p => this.favoriteIds.includes(p.id));
  }
  get nonFavoriteProducts(): Product[] {
    return (this.filteredProducts || []).filter(p => !this.favoriteIds.includes(p.id));
  }
  get othersFiltered(): Product[] {
    return this.filteredProducts.filter(p => !this.isFavorite(p.id));
  }
  activeCategoryId: number | null = null;
  
  baseProducts: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';

  sortBy: string = 'default';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  minRating: number = 0;

  sidebarCategories: SidebarCategory[] = [
    { id: 1, label: 'Смартфоны',  count: 5 },
    { id: 2, label: 'Компьютеры', count: 5 },
    { id: 3, label: 'Наушники',   count: 5 },
    { id: 4, label: 'Планшеты',   count: 5 },
  ];


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] || changes['allProducts'] || changes['selectedCategoryId']) {
      this.filterProducts();
    }
  }

  onSelectCategory(id: number): void {
    this.activeCategoryId = id;
    this.categorySelected.emit(id);
  }

  onSidebarClick(id: number): void {
    this.categorySelected.emit(id);
  }

  filterProducts(): void {
    let filtered = [...this.products];

    const q = this.searchQuery.trim().toLowerCase();
    if (q) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q));
    }

    const min = this.minPrice;
    if (min !== null) {
      filtered = filtered.filter(p => p.price >= min);
    }

    const max = this.maxPrice;
    if (max !== null) {
      filtered = filtered.filter(p => p.price <= max);
    }

    if (this.minRating > 0) {
      filtered = filtered.filter(p => p.rating >= this.minRating);
    }

    if (this.sortBy === 'rating') {
      filtered = filtered.slice().sort((a, b) => b.rating - a.rating);
    } else if (this.sortBy === 'price-asc') {
      filtered = filtered.slice().sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-desc') {
      filtered = filtered.slice().sort((a, b) => b.price - a.price);
    }

    this.filteredProducts = filtered;
  }
  resetFilters(): void {
    this.searchQuery = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.minRating = 0;
    this.sortBy = 'default';

    this.resetRequested.emit();
  }

  onDelete(productId: number): void {
    this.filteredProducts = this.filteredProducts.filter(p => p.id !== productId);
  }
}