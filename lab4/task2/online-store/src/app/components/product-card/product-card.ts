import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: Product;
  currentImageIndex = 0;

  getStars(): string[] {
    const stars = [];
    const fullStars = Math.floor(this.product.rating);
    const hasHalfStar = this.product.rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }
    
    if (hasHalfStar) {
      stars.push('half');
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push('empty');
    }
    
    return stars;
  }

  shareOnWhatsApp(): void {
    const message = `Check out this product: ${this.product.link}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  }

  shareOnTelegram(): void {
    const encodedUrl = encodeURIComponent(this.product.link);
    const encodedText = encodeURIComponent(this.product.name);
    window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`, '_blank');
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length;
  }

  previousImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.product.images.length) % this.product.images.length;
  }

  selectImage(index: number): void {
    this.currentImageIndex = index;
  }

  openProductLink(): void {
    window.open(this.product.link, '_blank');
  }
}
