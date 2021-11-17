export interface IPaginateResult<T> {
  content: T[];
  totalElements: number;
  page: number;
  last: boolean;
  first: boolean;
  limit: number;
  totalPages: number;
}