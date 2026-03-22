import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PaginatedResponse } from '../../../core/api/api-types';
import { Order, OrderListFilters } from '../models/order.model';

/**
 * Serviço de pedidos. Quando o backend expuser o recurso, usar `inject(ApiClient)` e rotas em `api-paths`.
 */
@Injectable({ providedIn: 'root' })
export class OrdersService {
  /** Stub até existir contrato OpenAPI / `docs/backendSummary` para pedidos. */
  list(filters: OrderListFilters): Observable<PaginatedResponse<Order>> {
    return of({
      pageNumber: filters.pageNumber,
      pageSize: filters.pageSize,
      totalCount: 0,
      data: []
    });
  }
}
