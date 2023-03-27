export interface ResponseBase<T> {
  data: T;
  failed: boolean;
  message: string;
  succeeded: boolean;
}
