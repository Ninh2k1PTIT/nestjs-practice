export class PaginatedResponseDto<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    size: number;
    totalPages: number;
  };

  constructor(
    items: T[],
    total: number,
    query: { page: number; size: number },
  ) {
    this.items = items;
    this.meta = {
      total,
      page: query.page,
      size: query.size,
      totalPages: Math.ceil(total / query.size),
    };
  }
}
