export interface ValidationError {
  rowNumber: number;
  gfcid: string;
  errorMessage: string;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  errors: ValidationError[];
}