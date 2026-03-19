import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../models/album';
import { Photo } from '../models/photo';

@Injectable({ providedIn: 'root' })
export class AlbumService {

  api = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.api}/albums`);
  }

  getAlbum(id: number): Observable<Album> {
    return this.http.get<Album>(`${this.api}/albums/${id}`);
  }

  getPhotos(id: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.api}/albums/${id}/photos`);
  }

  deleteAlbum(id: number) {
    return this.http.delete(`${this.api}/albums/${id}`);
  }

  updateAlbum(album: Album) {
    return this.http.put(`${this.api}/albums/${album.id}`, album);
  }
}