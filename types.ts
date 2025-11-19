export interface EditedImage {
  data: string; // Base64 string
  mimeType: string;
}

export interface ProcessingState {
  isProcessing: boolean;
  error: string | null;
}

export enum ViewMode {
  SIDE_BY_SIDE = 'SIDE_BY_SIDE',
  COMPARE = 'COMPARE'
}
