export interface ProblemDetails {
  title: string;
  status: number;
  type?: string;
  detail?: string;
  errors?: Record<string, string[]>;
}

export interface ApiError {
  problem: ProblemDetails;
  status: number;
  correlationId?: string;
  retryAfterSeconds?: number;
}

export interface PaginatedResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  data: T[];
}
