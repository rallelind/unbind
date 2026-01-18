export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface BookCandidate {
  title: string;
  author: string | null;
  coverImage: string | null;
  score: number;
}

export interface DetectionBook {
  id: string;
  boundingBox: BoundingBox;
  detectionConfidence: number;
}

export interface ExtractionResult {
  id: string;
  title: string | null;
  author: string | null;
  verified: boolean;
  coverImage: string | null;
  verifiedTitle: string | null;
  verifiedAuthor: string | null;
  candidates: BookCandidate[];
  failureReason: string | null;
}

export type SSEEvent =
  | { type: "detections"; data: { total: number; books: DetectionBook[] } }
  | { type: "extraction"; data: ExtractionResult }
  | { type: "complete" }
  | { type: "error"; message: string };

export interface Book {
  id: string;
  title: string | null;
  author: string | null;
  boundingBox: BoundingBox;
  detectionConfidence: number;
}

export interface AnalyzeResponse {
  books: Book[];
}

export interface SearchResult {
  title: string;
  author: string | null;
  coverImage: string | null;
}
