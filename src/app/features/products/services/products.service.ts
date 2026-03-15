import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../../core/api/api-client';
import { PaginatedResponse } from '../../../core/api/api-types';
import { CreateProductRequest, Product, ProductFilters, UpdateProductRequest } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private readonly apiClient: ApiClient) {}

  list(filters: ProductFilters): Observable<PaginatedResponse<Product>> {
    return this.apiClient.get<PaginatedResponse<Product>>('/products', {
      params: {
        pageNumber: filters.pageNumber,
        pageSize: filters.pageSize,
        search: filters.search
      }
    });
  }

  create(payload: CreateProductRequest): Observable<Product> {
    return this.apiClient.post<Product, CreateProductRequest>('/products', payload, {
      idempotencyKey: crypto.randomUUID()
    });
  }

  update(payload: UpdateProductRequest): Observable<Product> {
    return this.apiClient.put<Product, UpdateProductRequest>(`/products/${payload.id}`, payload);
  }

  remove(id: string): Observable<void> {
    return this.apiClient.delete<void>(`/products/${id}`);
  }
}
