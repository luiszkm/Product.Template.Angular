export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  createdAt: string;
}

export interface ProductFilters {
  pageNumber: number;
  pageSize: number;
  search?: string;
}

export interface CreateProductRequest {
  name: string;
  sku: string;
  price: number;
  stock: number;
}

export interface UpdateProductRequest extends CreateProductRequest {
  id: string;
}
