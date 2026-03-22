/** Entidade alinhada ao contrato da API quando `orders` estiver disponível no backend. */
export interface Order {
  id: string;
  reference: string;
  status: string;
  totalAmount: number;
  createdAt: string;
}

export interface OrderListFilters {
  pageNumber: number;
  pageSize: number;
  search?: string;
}
