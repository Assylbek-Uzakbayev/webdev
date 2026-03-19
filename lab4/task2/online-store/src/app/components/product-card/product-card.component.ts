import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() favoriteIds: number[] = [];

  @Output() deleteProduct = new EventEmitter<number>();
  @Output() favoriteToggled = new EventEmitter<number>();

  get isFavorite(): boolean {
    return this.favoriteIds.includes(this.product.id);
  }
  onToggleFavorite(e?: Event): void {
    e?.stopPropagation();
    e?.preventDefault();
    this.favoriteToggled.emit(this.product.id);
  }
  like(): void {
    this.product.likes++;
  }
  activeImageIndex: number = 0;
  showGallery: boolean = false;
  showShareMenu: boolean = false;

  delete(): void {
    if (confirm(`Удалить "${this.product.name}"?`)) {
      this.deleteProduct.emit(this.product.id);
    }
  }

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i);
  }

  isStarFilled(index: number, rating: number): boolean {
    return index < Math.floor(rating);
  }

  isStarHalf(index: number, rating: number): boolean {
    return index === Math.floor(rating) && rating % 1 >= 0.5;
  }

  setActiveImage(index: number): void {
    this.activeImageIndex = index;
  }

  nextImage(): void {
    this.activeImageIndex = (this.activeImageIndex + 1) % this.product.images.length;
  }

  prevImage(): void {
    this.activeImageIndex =
      (this.activeImageIndex - 1 + this.product.images.length) % this.product.images.length;
  }

  toggleGallery(): void {
    this.showGallery = !this.showGallery;
  }

  toggleShareMenu(): void {
    this.showShareMenu = !this.showShareMenu;
  }

  shareWhatsApp(): void {
    const text = encodeURIComponent(`Посмотри этот товар: ${this.product.name} - ${this.product.link}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    this.showShareMenu = false;
  }

  shareTelegram(): void {
    const url = encodeURIComponent(this.product.link);
    const text = encodeURIComponent(this.product.name);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
    this.showShareMenu = false;
  }

  getInstallment(price: number): string {
    return Math.round(price / 3).toLocaleString("ru-KZ");
  }

  formatPrice(price: number): string {
    return price.toLocaleString('ru-KZ') + ' ₸';
  }
}