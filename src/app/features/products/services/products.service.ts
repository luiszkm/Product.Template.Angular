import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../../core/api/api-client';
import { API_PATHS } from '../../../core/api/api-paths';
import { PaginatedResponse } from '../../../core/api/api-types';
import { CreateProductRequest, Product, ProductFilters, UpdateProductRequest } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private readonly apiClient: ApiClient) {}

  list(filters: ProductFilters): Observable<PaginatedResponse<Product>> {
    return this.apiClient.get<PaginatedResponse<Product>>(API_PATHS.products.base, {
      params: {
        pageNumber: filters.pageNumber,
        pageSize: filters.pageSize,
        search: filters.search,
        category: filters.category,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice
      }
    });
  }

  create(payload: CreateProductRequest): Observable<Product> {
    return this.apiClient.post<Product, CreateProductRequest>(API_PATHS.products.base, payload, {
      idempotencyKey: crypto.randomUUID()
    });
  }

  update(payload: UpdateProductRequest): Observable<Product> {
    return this.apiClient.put<Product, UpdateProductRequest>(API_PATHS.products.byId(payload.id), payload);
  }

  remove(id: string): Observable<void> {
    return this.apiClient.delete<void>(API_PATHS.products.byId(id));
  }
}
