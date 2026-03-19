
export interface Product {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  images: string[];
  link: string;
  likes: number;

  isFavorite?: boolean;
}