import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ProductsStore } from './products.store';
import { ProductsService } from '../services/products.service';
import { ApiError } from '../../../core/api/api-types';
import { PaginatedResponse } from '../../../core/api/api-types';
import { Product, UpdateProductRequest } from '../models/product.model';

function emptyList(): PaginatedResponse<Product> {
  return {
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    data: []
  };
}

describe('ProductsStore', () => {
  it('deve criar o store', () => {
    const productsServiceStub: Pick<ProductsService, 'list' | 'create' | 'update' | 'remove'> = {
      list: () => of(emptyList()),
      create: () => of({} as Product),
      update: () =>
        of({
          id: '1',
          name: 'A',
          sku: 'SKU',
          price: 1,
          stock: 1,
          createdAt: ''
        }),
      remove: () => of(undefined)
    };

    TestBed.configureTestingModule({
      providers: [ProductsStore, { provide: ProductsService, useValue: productsServiceStub }]
    });

    const store = TestBed.inject(ProductsStore);
    expect(store).toBeTruthy();
  });

  it('update deve chamar ProductsService.update e recarregar lista', () => {
    const updated: UpdateProductRequest = {
      id: '1',
      name: 'Nome',
      sku: 'sku-1',
      price: 10,
      stock: 2
    };

    let updateCalls = 0;
    let listCalls = 0;

    const productsServiceStub: Pick<ProductsService, 'list' | 'create' | 'update' | 'remove'> = {
      list: () => {
        listCalls += 1;
        return of(emptyList());
      },
      create: () => of({} as Product),
      update: (req) => {
        updateCalls += 1;
        expect(req).toEqual(updated);
        return of({
          id: req.id,
          name: req.name,
          sku: req.sku,
          price: req.price,
          stock: req.stock,
          createdAt: ''
        });
      },
      remove: () => of(undefined)
    };

    TestBed.configureTestingModule({
      providers: [ProductsStore, { provide: ProductsService, useValue: productsServiceStub }]
    });

    const store = TestBed.inject(ProductsStore);
    store.update(updated);

    expect(updateCalls).toBe(1);
    expect(listCalls).toBeGreaterThan(0);
  });

  it('update deve mapear erros de validação 400', () => {
    const apiError: ApiError = {
      status: 400,
      problem: {
        title: 'Validation',
        status: 400,
        errors: { name: ['Inválido'] }
      }
    };

    const productsServiceStub: Pick<ProductsService, 'list' | 'create' | 'update' | 'remove'> = {
      list: () => of(emptyList()),
      create: () => of({} as Product),
      update: () => throwError(() => apiError),
      remove: () => of(undefined)
    };

    TestBed.configureTestingModule({
      providers: [ProductsStore, { provide: ProductsService, useValue: productsServiceStub }]
    });

    const store = TestBed.inject(ProductsStore);
    store.update({
      id: '1',
      name: 'Nome',
      sku: 'sku-1',
      price: 10,
      stock: 2
    });

    expect(store.validationErrors()).toEqual({ name: ['Inválido'] });
  });
});
