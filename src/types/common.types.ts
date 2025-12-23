/**
 * Common Types
 * Constitution III: Strict Typing - 전역 공통 타입 정의
 */

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  status: LoadingState;
  error: ApiError | null;
}
